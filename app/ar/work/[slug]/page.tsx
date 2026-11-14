import type { Metadata } from "next"
import { projectSlugs } from "@/lib/site"
import { CaseStudyPage, caseStudyMetadata } from "../../../_shared/case-study-page"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return caseStudyMetadata("ar", (await params).slug)
}

export default async function Page({ params }: Props) {
  return <CaseStudyPage locale="ar" slug={(await params).slug} />
}
