import RankingHeader from './_components/ranking-header';
import RankingList from './_components/ranking-list';
import { mockRankingItems } from '@/data/mock-ranking';

export default function RankingPage() {
  return (
    <div className="container-wrapper">
      <div className="container flex flex-col py-6 gap-6">
        <RankingHeader />
        <RankingList items={mockRankingItems} />
      </div>
    </div>
  );
}
