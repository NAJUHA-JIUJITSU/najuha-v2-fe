async function getPost(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: '제목이다 이짜식아',
        type: 'free',
        date: new Date(),
        likeCnt: 123,
        viewCnt: 123,
        commentCnt: 123,
        content: '내용이다 이짜식아아아아아',
        hot: true,
      });
    }, 1000);
  });
}

export default async function Post({ id }: { id: number }) {
  const data = await getPost(id);
  return <div>글컴포넌트</div>;
}
