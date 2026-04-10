import { getToken } from "./authenticate";

export async function getFavourites() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });

    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

export async function addToFavourites(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${getToken()}`,
        },
      }
    );

    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}
