import MyPremiumForm from "../presenter/my-premium.ui/MyPremiumForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMyPremiumService } from "../../service/premium";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export type PremiumFormValues = {
  academyName?: string;
  logo?: File[];
  banner?: File[];
};

const MyPremiumInteractor = ({ id }: { id: string }): React.JSX.Element => {
  const service = useMyPremiumService();

  const { register, handleSubmit } = useForm<PremiumFormValues>({
    defaultValues: async () => {
      const data = await service.get(id);
      return {
        academyName: data.academyName,
      };
    },
  });

  const handleSubmitForm: SubmitHandler<PremiumFormValues> = (data) => {
    service.save({ form: data, id });
  };

  return (
    <div className="h-full">
      <MyPremiumForm
        onFormSubmit={handleSubmitForm}
        register={register}
        handleSubmit={handleSubmit}
      />
      <Link className="absolute bottom-20 right-20" to={`/premium/${id}`}>
        <Button variant="outlined" color="info">
          프리미엄 페이지 이동하기
        </Button>
      </Link>
    </div>
  );
};

export default MyPremiumInteractor;
