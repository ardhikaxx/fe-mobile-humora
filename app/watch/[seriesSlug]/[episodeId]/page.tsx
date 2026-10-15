import { Suspense } from 'react';
import { SERIES_LIST } from '../../../../lib/data/seriesData';
import WatchClient from './WatchClient';

export function generateStaticParams() {
  const params: { seriesSlug: string; episodeId: string }[] = [];
  SERIES_LIST.forEach((series) => {
    series.episodes.forEach((episode) => {
      params.push({
        seriesSlug: series.slug,
        episodeId: String(episode.id),
      });
    });
  });
  return params;
}

async function WatchContent({
  params,
}: {
  params: Promise<{ seriesSlug: string; episodeId: string }>;
}) {
  const { seriesSlug, episodeId } = await params;
  return <WatchClient seriesSlug={seriesSlug} episodeId={episodeId} />;
}

export default function WatchPage({
  params,
}: {
  params: Promise<{ seriesSlug: string; episodeId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#15031F] text-white select-none min-h-[300px]">
          <div className="w-8 h-8 border-3 border-[#FFD52E] border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs text-[#FFD52E] font-medium tracking-wide">
            Memuat Video Player...
          </span>
        </div>
      }
    >
      <WatchContent params={params} />
    </Suspense>
  );
}
