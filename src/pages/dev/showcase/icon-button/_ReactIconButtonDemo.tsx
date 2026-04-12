import IconButton from "@/components/ui/IconButton/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ReactIconButtonDemo() {
  return (
    <IconButton size="sm" border aria-label="close">
      <FontAwesomeIcon icon={faXmark} />
    </IconButton>
  );
}
