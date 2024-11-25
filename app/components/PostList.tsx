import { log, table } from "console";
import React from "react";

export default async function PostList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
    {
      cache: "no-store", // Optionnel, pour désactiver la mise en cache
    }
  );
  const posts = await response.json();

  // const qui filtre les posts et qui affiche les posts en-dessous de 15 caractères
  const filteredPostsWithFilter = posts.filter(
    (post: any) => post.title.length < 15
  );

  // const qui recherche le post avec le titre "Learn React"
  const filteredPostsWithFind = posts.find(
    (post: any) => post.title === "Learn React"
  );

  // const qui parcourt tous les posts et affiche leur id
  const filteredPostsWithMap = posts.map((post: any) => `Id : ${post.id}`);

  // const qui vérifie si au moins un post contient un titre de plus de 15 caractères
  const hasLongTitle = posts.some((post: any) => post.title.length > 15);

  // const qui vérifie si tous les posts ont un id inférieur à 5
  const PostHasId = posts.every((post: any) => post.id < 5);

  const price = [
    30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10,
  ];

  // const qui réduit le tableau price a une seule valeur en les additionnant toutes
  const totalPrice = price.reduce((acc, curr) => acc + curr, 0);

  // const qui vérifie si la valeur 40 est incluse dans le tableau price
  const includeExpensivePrice = price.includes(40);
  log(includeExpensivePrice);

  return (
    <div>
      <div>
        {posts.map(
          (post: { id: number; title: string; description: string }) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          )
        )}
      </div>
      <h2 className="mt-8">Posts filtrés : (en-dessous de 15 caractères)</h2>
      <div>
        {filteredPostsWithFilter.map((post: { id: number; title: string }) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
      <h2 className="mt-8">Posts filtrés : (avec le titre "Learn React")</h2>
      <div>
        {filteredPostsWithFind && (
          <div>
            <h2>{filteredPostsWithFind.title}</h2>
          </div>
        )}
      </div>
      <h2 className="mt-8">
        Posts filtrés : (avec la fonction forEach et la condition "title.length
        15")
      </h2>
      <div>{filteredPostsWithMap.join(", ")}</div>
      <h2 className="mt-8">
        Un post contient t'il un titre de plus de 15 caractères ?
      </h2>
      <div>{hasLongTitle ? "Oui" : "Non"}</div>
      <h2>Tous les posts ont-ils un id inférieur à 5 ?</h2>
      <div>{PostHasId ? "Oui" : "Non"}</div>
          <h2>Voici les prix des articles :</h2>
      <ul className="flex flex-row">
        {price.map((price: number, index: number) => (
            <li key={index}>| {price} |</li>
        ))}
      </ul>
        <h2>Voici le total des prix des articles :</h2>
      <div>{totalPrice}</div>
    </div>
  );
}
