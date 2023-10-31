import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const MyScoreContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{
        fontWeight: 'bold',
        color: "primary.main"
      }}>
        교과 성적 입력
      </Typography>
      {children}
    </Container>
  );
};

export default MyScoreContainer;
