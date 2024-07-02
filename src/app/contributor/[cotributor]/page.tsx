export default function Page({ params }: { params: { cotributor: string } }) {
  return <p>Post: {params.cotributor}</p>;
}
