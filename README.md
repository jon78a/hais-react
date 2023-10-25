# 프로젝트 가이드

## 기술 스택

React18, Recoil, React Context API,  
tailwindcss, mui,  
Firestore, Firebase hosting  

## Test

```console
npm run test:unit
```

## Conventions

.

## Component API

### SearchSuggestionTable

검색 -> 제안 -> 조회의 흐름을 가지는 테이블 컴포넌트입니다.
HAIS 교과 추천 테이블 및 어드민 페이지 테스트에 활용되는 컴포넌트입니다.

#### 1. 데이터

데이터에는 각각 단계가 부여되어 있어야 합니다.

가령 HAIS 프로젝트 내부에서 활용되는 데이터의 예시를 들자면,
대학 -> 학과 -> 선택과목 순으로 데이터 검색 흐름이 나타납니다.
이를 각각 검색(Search) -> 제안(Suggestion) -> 조회(Target)와 연결할 수 있습니다.

#### 2. Props

* [2.1. searchProps(*)](#21-searchProps)
  * [2.1.1. onSearch(*)](#211-onSearch)
  * [2.1.2. tableData(*)](#212-tableData)
* [2.2. suggestionProps(*)](#22-suggestionProps)
* [2.3. targetProps(*)](#23-targetProps)

#### 2.1. searchProps

#### 2.1.1. onSearch

*type - Callback*
*params - value: string, event: React.ChangeEvent*

#### 2.1.2. tableData

*type - TableData<T>*

키워드 검색 요청 시, 필터링된 데이터 상태를 주입합니다.

TableData<T> interface를 만족합니다.
```typescript
interface TableData<T> {
  columns: GridColDef[];
  rows: T[];
}

// (* GridColDef는 MUI내부 모듈 타입임)
```

#### 2.2. suggestionProps

#### 2.3. targetProps

### 3. Components

아래의 Components를 참조합니다.

* [SearchBar](#SearchBar)

### SearchBar

아래와 같은 UI 스타일을 지닌 검색바입니다.

<img width="416" alt="image" src="https://github.com/bitstep-Be-A/hais-react/assets/82345753/00f66301-56a4-42b9-aee6-1e9b32f60d54">

#### 1. Props

* 1.1. placeholder
* 1.2. searchIconButton
* 1.3. onSubmit
* 1.4. onInputChange(*)
* 1.5. inputValue(*)
* 1.6. size(*)
* 1.7. sx
