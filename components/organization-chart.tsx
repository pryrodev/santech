"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";

export type OrganizationMember = {
  id: string;
  name: string;
  title: string;
  department: string;
  managerId?: string;
  image?: string;
  description?: string;
};

export const defaultOrganizationMembers: OrganizationMember[] = [
  {
    id: "shema-pacifique",
    name: "Shema Pacifique",
    title: "Founder & Chief Executive Officer",
    department: "Executive direction",
    image: "/images/ceo.png",
    description:
      "Sets SAN TECH's direction and keeps the ecosystem focused on useful, measurable technology impact.",
  },
  {
    id: "claudine-niyonzima",
    name: "Claudine Niyonzima",
    title: "Co-founder & COO/CFO",
    department: "Operations and finance",
    managerId: "shema-pacifique",
    image: "/images/claudine.png",
    description:
      "Coordinates operational delivery, financial discipline, and the systems that help teams move together.",
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    title: "Product engineering team",
    department: "Software delivery",
    managerId: "claudine-niyonzima",
    description:
      "Builds reliable software products, integrations, and platforms for institutions and communities.",
  },
  {
    id: "felix",
    name: "Felix",
    title: "Software Developer",
    department: "Software engineering",
    managerId: "software-engineering",
    image: "/images/felix  santech.png",
    description:
      "Builds practical digital products and reliable systems at SAN TECH.",
  },
  {
    id: "placide",
    name: "Placide",
    title: "Software Developer",
    department: "Software engineering",
    managerId: "software-engineering",
    image: "/images/placide.png",
    description:
      "Contributes to software development and product delivery across SAN TECH initiatives.",
  },
  {
    id: "product-and-design",
    name: "Product & Design",
    title: "Product and experience team",
    department: "Product development",
    managerId: "claudine-niyonzima",
    description:
      "Turns user needs and institutional challenges into clear, useful product experiences.",
  },
  {
    id: "innovation-and-research",
    name: "Innovation & Research",
    title: "Innovation and research team",
    department: "Research and development",
    managerId: "claudine-niyonzima",
    description:
      "Explores new possibilities through research, prototypes, and ecosystem partnerships.",
  },
  {
    id: "san-hub-programs",
    name: "SAN HUB Programs",
    title: "Learning and community team",
    department: "Training and capacity building",
    managerId: "claudine-niyonzima",
    description:
      "Connects people to learning, mentorship, internships, and practical technology opportunities.",
  },
];

const nodeWidth = 222;
const nodeHeight = 112;

type OrganizationNodeData = OrganizationMember & { selected: boolean };
type OrganizationNode = Node<OrganizationNodeData, "organizationMember">;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function MemberNode({ data }: NodeProps<OrganizationNode>) {
  return (
    <article
      className={`relative w-[222px] overflow-hidden rounded-xl border bg-white shadow-[0_8px_22px_rgba(10,31,68,0.08)] transition-all ${data.selected ? "border-brand-cyan ring-2 ring-brand-cyan/20" : "border-slate-200"}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!size-1.5 !border-0 !bg-brand-cyan"
      />
      <div className="flex items-center gap-3 px-3.5 py-3">
        <div className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#e8f1fa] text-xs font-black tracking-[0.12em] text-[#0a1f44]">
          {data.image ? (
            <Image
              src={data.image}
              alt=""
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          ) : (
            getInitials(data.name)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-black leading-tight text-[#0a1f44]">
            {data.name}
          </p>
          <p className="mt-1 line-clamp-2 text-[10px] font-bold leading-tight text-slate-500">
            {data.title}
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-[#f7faff] px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-brand-secondary">
        {data.department}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!size-1.5 !border-0 !bg-brand-cyan"
      />
    </article>
  );
}

function layoutOrganization(members: OrganizationMember[]) {
  const graph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "TB",
    nodesep: 34,
    ranksep: 64,
    marginx: 24,
    marginy: 24,
  });

  members.forEach((member) =>
    graph.setNode(member.id, { width: nodeWidth, height: nodeHeight }),
  );

  const edges: Edge[] = members.flatMap((member) => {
    if (!member.managerId) return [];
    const edgeId = `${member.managerId}-${member.id}`;
    graph.setEdge(member.managerId, member.id);
    return [
      {
        id: edgeId,
        source: member.managerId,
        target: member.id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#8da5c4", strokeWidth: 1.5 },
      },
    ];
  });

  dagre.layout(graph);

  const nodes: OrganizationNode[] = members.map((member) => {
    const position = graph.node(member.id);
    return {
      id: member.id,
      type: "organizationMember",
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
      data: { ...member, selected: false },
      draggable: false,
      selectable: true,
    };
  });

  return { nodes, edges };
}

function OrganizationChartContent({
  members,
}: {
  members: OrganizationMember[];
}) {
  const layout = useMemo(() => layoutOrganization(members), [members]);
  const nodeTypes = useMemo(() => ({ organizationMember: MemberNode }), []);
  const fitViewOptions = useMemo(
    () => ({ padding: 0.18, minZoom: 0.55, maxZoom: 1.1 }),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="h-[440px] overflow-hidden rounde-md border border-slate-200 bg-[#f7faff] [&_.react-flow__controls]:overflow-hidden [&_.react-flow__controls-button]:border-slate-200 [&_.react-flow__controls-button]:bg-white [&_.react-flow__controls-button]:fill-[#0a1f44] sm:h-[480px]">
        <ReactFlow
          nodes={layout.nodes}
          edges={layout.edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background color="#d6e2f1" gap={24} size={1} />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
}

export function OrganizationChart({
  members = defaultOrganizationMembers,
}: {
  members?: OrganizationMember[];
}) {
  return (
    <ReactFlowProvider>
      <OrganizationChartContent members={members} />
    </ReactFlowProvider>
  );
}
