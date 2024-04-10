import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MyPremiumContext } from "../../service/premium";
import { PremiumRepository } from "../../domain/premium/premium.interface";

const MyPremiumContainer = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: { premiumRepository: PremiumRepository };
}) => {
  const { premiumRepository } = repositories;

  return (
    <MyPremiumContext.Provider
      value={{
        async save({ form, id }) {
          const data = await premiumRepository.save({ form, id });
          return data.id;
        },
        async get(id) {
          const data = await premiumRepository.get(id);
          return data;
        },
      }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            display: "none",
          }}
        >
          프리미엄
        </Typography>
        {children}
      </Container>
    </MyPremiumContext.Provider>
  );
};

export default MyPremiumContainer;
