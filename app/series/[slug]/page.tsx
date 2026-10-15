import { Suspense } from 'react';
import { SERIES_LIST } from '../../../lib/data/seriesData';
import SeriesDetailClient from './SeriesDetailClient';

export function generateStaticParams() {
  return SERIES_LIST.map((series) => ({
    slug: series.slug,
  }));
}

async function SeriesDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SeriesDetailClient slug={slug} />;
}

export default function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-[#4B0B7A] min-h-[300px]">
          <div className="w-8 h-8 border-3 border-[#4B0B7A] border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs text-[#786F7D] font-medium tracking-wide">
            Memuat Detail Series...
          </span>
        </div>
      }
    >
      <SeriesDetailContent params={params} />
    </Suspense>
  );
}
