import { NextResponse } from "next/server";

type GoogleLocalizedText = {
  text?: string;
  languageCode?: string;
};

type GoogleReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: GoogleLocalizedText;
  originalText?: GoogleLocalizedText;
  rating?: number;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
  googleMapsUri?: string;
};

type GooglePlaceDetails = {
  displayName?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

type LegacyGoogleReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type LegacyPlaceDetails = {
  status?: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: LegacyGoogleReview[];
  };
};

type ReviewResponse = {
  id: string;
  authorName: string;
  authorUrl: string;
  photoUrl: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  reviewUrl: string;
};

const GOOGLE_PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places";
const LEGACY_GOOGLE_PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const FIELD_MASK =
  "displayName,rating,userRatingCount,googleMapsUri,reviews";

function errorResponse(error: string, status = 200) {
  return NextResponse.json(
    {
      ok: false,
      error,
      reviews: [],
    },
    { status }
  );
}

async function fetchNewPlaceDetails(apiKey: string, placeId: string) {
  const url = new URL(`${GOOGLE_PLACE_DETAILS_URL}/${placeId}`);
  url.searchParams.set("languageCode", "en");
  url.searchParams.set("regionCode", "IN");

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const place = (await response.json()) as GooglePlaceDetails;
  const reviews: ReviewResponse[] = (place.reviews ?? [])
    .map((review) => {
      const text = review.originalText?.text ?? review.text?.text ?? "";

      return {
        id: review.name ?? `${review.authorAttribution?.displayName}-${review.publishTime}`,
        authorName: review.authorAttribution?.displayName ?? "Google reviewer",
        authorUrl: review.authorAttribution?.uri ?? "",
        photoUrl: review.authorAttribution?.photoUri ?? "",
        rating: review.rating ?? 5,
        text,
        relativeTime: review.relativePublishTimeDescription ?? "",
        publishTime: review.publishTime ?? "",
        reviewUrl: review.googleMapsUri ?? place.googleMapsUri ?? "",
      };
    })
    .filter((review) => review.text.length > 0);

  return {
    ok: true,
    source: "places-new",
    placeName: place.displayName?.text ?? "DryClean Masters",
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    googleMapsUrl: place.googleMapsUri ?? "",
    reviews,
  };
}

async function fetchLegacyPlaceDetails(apiKey: string, placeId: string) {
  const url = new URL(LEGACY_GOOGLE_PLACE_DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,url,reviews");
  url.searchParams.set("reviews_no_translations", "true");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, { next: { revalidate: 3600 } });
  const place = (await response.json()) as LegacyPlaceDetails;

  if (!response.ok || place.status !== "OK" || !place.result) {
    return null;
  }

  const googleMapsUrl = place.result.url ?? "";
  const reviews: ReviewResponse[] = (place.result.reviews ?? [])
    .map((review) => {
      const publishTime = review.time
        ? new Date(review.time * 1000).toISOString()
        : "";

      return {
        id: `${review.author_name}-${review.time}`,
        authorName: review.author_name ?? "Google reviewer",
        authorUrl: review.author_url ?? "",
        photoUrl: review.profile_photo_url ?? "",
        rating: review.rating ?? 5,
        text: review.text ?? "",
        relativeTime: review.relative_time_description ?? "",
        publishTime,
        reviewUrl: googleMapsUrl,
      };
    })
    .filter((review) => review.text.length > 0);

  return {
    ok: true,
    source: "places-legacy",
    placeName: place.result.name ?? "DryClean Masters",
    rating: place.result.rating ?? null,
    userRatingCount: place.result.user_ratings_total ?? null,
    googleMapsUrl,
    reviews,
  };
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return errorResponse("Google Places API credentials are not configured.");
  }

  try {
    const place =
      (await fetchNewPlaceDetails(apiKey, placeId)) ??
      (await fetchLegacyPlaceDetails(apiKey, placeId));

    if (!place || place.reviews.length === 0) {
      return errorResponse("Unable to fetch Google reviews.");
    }

    return NextResponse.json(place);
  } catch (error) {
    console.error("[google-reviews]", error);

    return errorResponse("Unable to fetch Google reviews.");
  }
}
