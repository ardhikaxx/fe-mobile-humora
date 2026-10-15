import { SERIES_LIST } from '../../../lib/data/seriesData';
import SeriesDetailClient from './SeriesDetailClient';

export function generateStaticParams() {
  return SERIES_LIST.map((series) => ({
    slug: series.slug,
  }));
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SeriesDetailClient slug={slug} />;
}
