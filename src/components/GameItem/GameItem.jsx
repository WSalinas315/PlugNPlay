import { useParams } from "react-router-dom";

export default function () {

  const { id } = useParams();

  return (
  <>
    Welcome to game ID {id}
  </>
  )
}