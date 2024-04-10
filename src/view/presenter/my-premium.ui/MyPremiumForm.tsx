import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MyPremiumFormUx } from "../my-premium.ux/MyPremiumForm";
import { useState } from "react";

export default function MyPremiumForm(ux: MyPremiumFormUx) {
  const [logoImageName, setLogoImageName] = useState<string | null>(null);
  const [bannerImageName, setBannerImageName] = useState<string | null>(null);

  const onBannerChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target?.files?.[0];
    if (file?.name) {
      setBannerImageName(file.name);
    } else {
      setBannerImageName(null);
    }
  };

  const onLogoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target?.files?.[0];
    if (file?.name) {
      setLogoImageName(file.name);
    } else {
      setLogoImageName(null);
    }
  };

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-black font-medium text-2xl mb-6">프리미엄</h2>
        <form
          className="flex flex-col space-y-2"
          onSubmit={ux.handleSubmit(ux.onFormSubmit)}
        >
          <FormControl
            sx={{
              width: "75%",
            }}
          >
            <TextField
              autoFocus
              label="학원명"
              variant="outlined"
              {...ux.register("academyName")}
            />
          </FormControl>

          <FormControl
            sx={{
              width: "75%",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              sx={{
                padding: "16.5px 14px",
                height: "56px",
                justifyContent: "left",
              }}
              startIcon={<CloudUploadIcon />}
            >
              {logoImageName ? logoImageName : "로고 업로드"}
              <input
                type="file"
                className="hidden"
                {...ux.register("logo", { onChange: onLogoChange })}
              />
            </Button>
          </FormControl>

          <FormControl
            sx={{
              width: "75%",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              tabIndex={-1}
              sx={{
                padding: "16.5px 14px",
                height: "56px",
                justifyContent: "left",
              }}
              startIcon={<CloudUploadIcon />}
            >
              {bannerImageName ? bannerImageName : "배너 업로드"}
              <input
                type="file"
                className="hidden"
                {...ux.register("banner", { onChange: onBannerChange })}
              />
            </Button>
          </FormControl>

          <Button
            type="submit"
            variant="outlined"
            sx={{ width: 120, ml: "auto", marginTop: "48px !important" }}
          >
            저장
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
