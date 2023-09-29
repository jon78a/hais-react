export interface RecommendAlgorithm {
  recommendOutput: (grade: number, suneung: boolean, majorMatching: boolean) => number;
}


export const recommendAlgorithm: RecommendAlgorithm = {
  recommendOutput: (grade, suneung, majorMatching) => {
    let score = 0;

    //성적이 존재하면 성적점수 반영 / 아니면 모든과목에 10점추가
    if (grade)
      score += 10 - grade;
    //수능과목인가?

    if (suneung) {
      score += 10;
    }


    //학과 전공과목
    if (majorMatching) {
      score += 20;
    } else {
      score += 0;
    }

    return score;
  },
};
