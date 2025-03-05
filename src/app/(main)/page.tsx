import MainBanner from './_components/main-banner';
import MainRanking from './_components/main-ranking';
import MainRecentFeeds from './_components/main-recent-feeds';
import MainDuckziller from './_components/main-store';

export default function Home() {
  return (
    <div className="container-wrapper">
      <div>
        <MainBanner
          items={[
            { src: '/images/banner.jpg' },
            { src: '/images/banner.jpg' },
            { src: '/images/banner.jpg' },
            { src: '/images/banner.jpg' },
          ]}
        />
      </div>
      <div className="container flex flex-col justify-center py-6 gap-3">
        <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
          <h1 className="text-xl font-bold">RANKING</h1>
          <MainRanking
            items={[
              {
                id: '1',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
              {
                id: '2',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
              {
                id: '3',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
              {
                id: '4',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
              {
                id: '5',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
              {
                id: '6',
                name: 'Lorem Ipsum',
                avatar: 'https://github.com/shadcn.png',
                image:
                  'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                like: 3,
              },
            ]}
          />
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
            <h1 className="text-xl font-bold">RECENT</h1>
            <MainRecentFeeds />
          </div>
          <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
            <h1 className="text-xl font-bold">POPULAR DUCKZILLER</h1>
            <MainDuckziller />
          </div>
        </div>
      </div>
    </div>
  );
}
