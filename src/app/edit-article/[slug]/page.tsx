"use client";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(slug);

  return <div>Edit</div>;
}
