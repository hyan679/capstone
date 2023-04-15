import { Alert, Button } from "antd";
import { useHistory } from "react-router";

export default function PermissionWarning({ disable }) {
  const history = useHistory();

  return (
    <div style={{ padding: "0" }}>
      {disable ? (
        <Alert
          message="No permission"
          description="You do not have admin permission"
          type="info"
          showIcon
          action={
            <Button
              type="default"
              onClick={() => {
                history.go(-1);
              }}
            >
              Back
            </Button>
          }
        />
      ) : null}
    </div>
  );
}
