async function download() {
  const response = await fetch(
    "https://coomer.su/api/v1/onlyfans/user/lunaokko/posts-legacy",
  );
  const data = await response.json();
  console.dir(data, { depth: null });
}

download();
