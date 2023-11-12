import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

/* Fetch the font from the static assets folder */
const font = fetch(
  new URL("../../../public/UniversLTStd-Cn.woff", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const univers = await font;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#171717",
          color: "#e5e5e5",
          display: "flex",
          flexShrink: 0,
          flexDirection: "column",
          fontFamily: '"Univers"',
          fontSize: 64,
          height: "100%",
          justifyContent: "center",
          lineHeight: 1.25,
          letterSpacing: "-0.025em",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "row",
            gap: 32,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "block",
              lineClamp: 3,
              marginLeft: 96,
            }}
          >
            {slug[0]}
          </div>
          <div
            style={{
              color: "#737373",
              display: "block",
              marginRight: 96,
            }}
          >
            Christopher Hugentobler
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "Univers",
          data: univers,
          style: "normal",
        },
      ],
    },
  );
}
