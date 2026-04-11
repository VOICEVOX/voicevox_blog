import Button from "@/components/ui/Button/Button";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ReactButtonDemo() {
  return (
    <Button
      kind="solid"
      tone="primary"
      shape="pill"
      size="md"
      icon={<FontAwesomeIcon icon={faDownload} />}
    >
      ダウンロード
    </Button>
  );
}
