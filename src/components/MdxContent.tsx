import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ProductCard } from "./ProductCard";
import { ComparisonTable } from "./ComparisonTable";
import { ProsConsList } from "./ProsConsList";
import { FilterReplacementCTA } from "./FilterReplacementCTA";
import { AffiliateButton } from "./AffiliateButton";
import { AffiliateDisclosure } from "./AffiliateDisclosure";
import { TableOfContents } from "./TableOfContents";
import { FAQ } from "./FAQ";
import { InternalLinks } from "./InternalLinks";
import { Source } from "./Source";
import { KeyTakeaways } from "./KeyTakeaways";
import { QuickAnswer } from "./QuickAnswer";
import { SourceCitation } from "./SourceCitation";
import { VerdictBox } from "./VerdictBox";
import { SpecTable } from "./SpecTable";

function MdxTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="mdx-table-wrapper">
      <table {...props} />
    </div>
  );
}

const components = {
  ProductCard,
  ComparisonTable,
  ProsConsList,
  FilterReplacementCTA,
  AffiliateButton,
  AffiliateDisclosure,
  TableOfContents,
  FAQ,
  InternalLinks,
  Source,
  KeyTakeaways,
  QuickAnswer,
  SourceCitation,
  VerdictBox,
  SpecTable,
  table: MdxTable,
};

interface MdxContentProps {
  source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose-elevated">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
          blockJS: false,
        }}
      />
    </div>
  );
}
