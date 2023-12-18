import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

type Profile = {
  id: number;
  name: string;
  major: string;
  lab: string;
  phone: string;
  email: string;
  linkUrl?: string;
  imgPath: string;
};

const People = (): JSX.Element => {
  return (
    <Container maxWidth="lg" className="mt-12 py-16">
      <Stack spacing={8}>
        {
          profileList.map((profile) => (
            <Stack key={profile.id} spacing={2}>
              <Stack direction="row" spacing={4} maxWidth={720}>
                <div className="w-[186px]">
                  <img className="w-full h-full" src={profile.imgPath} alt={`people${profile.id}`} />
                </div>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>이름</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{profile.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>전공</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{profile.major}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>연구실</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{profile.lab}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>전화</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{profile.phone}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>e-mail</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{profile.email}</Typography>
                  </Grid>
                  {
                    profile.linkUrl && (
                      <>
                        <Grid item xs={3}>
                          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>홈페이지</Typography>
                        </Grid>
                        <Grid item xs={9}>
                        <Button color="secondary" variant="contained"
                          onClick={() => window.open(profile.linkUrl, "_blank", "noopener, noreferrer")}
                        >바로가기</Button>
                        </Grid>
                      </>
                    )
                  }
                </Grid>
              </Stack>
              <Divider orientation="horizontal" />
            </Stack>
          ))
        }
      </Stack>
    </Container>
  );
};

export default People;

const profileList: Profile[] = [
  {
    id: 1,
    name: '김혜정 (Hyejeong Kim)',
    major: 'Biola Univ. 임상심리학 Ph.D.',
    lab: '현동홀 328c호',
    phone: '054-260-1455',
    email: 'hjgc@handong.edu',
    linkUrl: '#',
    imgPath: '/people/1.png'
  },
  {
    id: 2,
    name: '가요한 (Yohan Ka)',
    major: 'Vanderbilt Univ. 상담학 Ph.D.',
    lab: '현동홀 328A호',
    phone: '054-260-1458',
    email: 'yka@handong.edu',
    linkUrl: '#',
    imgPath: '/people/2.png'
  },
  {
    id: 3,
    name: '강병덕 (Byungdeok Kang)',
    major: 'Univ, of Georgia 사회복지학 Ph.D.',
    lab: '현동홀 310A',
    phone: '054-260-1434',
    email: 'bkang@handong.edu',
    linkUrl: '#',
    imgPath: '/people/3.png'
  },
  {
    id: 4,
    name: '라영안 (Young-An Ra)',
    major: 'Pennsylvania State Univ, 상담자교육 Ph.D.',
    lab: '현동홀 415호',
    phone: '054-260-1225',
    email: 'yar4466@handong.edu',
    linkUrl: '#',
    imgPath: '/people/4.png'
  },
  {
    id: 5,
    name: '신성만 (Sungman Shin)',
    major: 'Boston University 재활상담학 D.Sc.',
    lab: '현동홀 327호',
    phone: '054-260-1333',
    email: 'sshin@handong.edu',
    linkUrl: '#',
    imgPath: '/people/5.png'
  },
  {
    id: 6,
    name: '유장춘 (Jangchoon Yoo)',
    major: '연세대학교 사회복지학 Ph.D.',
    lab: '현동홀 328B호',
    phone: '054-260-1451',
    email: 'jcyoo@handong.edu',
    linkUrl: '#',
    imgPath: '/people/6.png'
  },
  {
    id: 7,
    name: '이지선 (Ji Sun Lee)',
    major: 'UCLA 사회복지학 Ph.D.',
    lab: '현동홀 326B호',
    phone: '054-260-3115',
    email: 'ezsun@handong.edu',
    linkUrl: '#',
    imgPath: '/people/7.png'
  },
  {
    id: 8,
    name: '이혜주 (Hyejoo J. Lee)',
    major: 'Georgia Institute of Tech, 산업 및 조직 심리학 Ph.D.',
    lab: '현동홀 315호',
    phone: '054-260-1836',
    email: 'joanna@handong.edu',
    linkUrl: '#',
    imgPath: '/people/8.png'
  },
  {
    id: 9,
    name: '전명희 (Myung Hee Jun)',
    major: '연세대학교 사회복지학 Ph.D.',
    lab: '현동홀 311호',
    phone: '054-260-1452',
    email: 'mjun@handong.edu',
    linkUrl: '#',
    imgPath: '/people/9.png'
  },
  {
    id: 10,
    name: '정숙희 (SookHee Jung)',
    major: '경북대학교 사회복지학 Ph.D.',
    lab: '현동홀 310B호',
    phone: '054-260-1454',
    email: 'goodnews@handong.edu',
    linkUrl: '#',
    imgPath: '/people/10.png'
  },
  {
    id: 11,
    name: '조성봉 (Sungbong Cho)',
    major: 'Florida State Univ. 결혼 및 가족치료 Ph.D.',
    lab: '느헤미야홀 425호',
    phone: '054-260-1934',
    email: 'scho@handong.edu',
    linkUrl: '#',
    imgPath: '/people/11.png'
  },
  {
    id: 12,
    name: '황혜리 (Hyeree Hwang)',
    major: 'Univ. of Wisconsin-Madison 교육심리학 Ph.D.',
    lab: '현동홀 312호',
    phone: '054-260-1280',
    email: 'hrhwang@handong.edu',
    linkUrl: '#',
    imgPath: '/people/12.png'
  }
];
