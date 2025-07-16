import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

import { toast } from 'react-toastify';
import { VITE_API_BASE_URL} from "@/utils/constants";

const KgPageComponent: React.FC = () => {

  const API_BASE_URL = VITE_API_BASE_URL;

  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });

  useEffect(() => {
    //  fetch(`${API_BASE_URL}/neo4j/claim/from-graph/8f14e45f-ea8c-4a18-9143-dc9b3ea3df62`)
    fetch(`${API_BASE_URL}/neo4j/claim/from-graph/22ccaebb-b7c9-4557-87fb-5f0cc086a97c`)
      .then(res => res.json())
      .then(data => {
        const nodes: any[] = [];
        const links: any[] = [];

        const claimNode = {
          id: data.claim.claim_id,
          label: "Claim",
          name: data.claim.claim,
          group: "claim"
        };
        nodes.push(claimNode);

        // Add Entity Nodes and Links
        data.entities.forEach((e: any, i: number) => {
          const entityId = `${e.name}-${i}`;
          nodes.push({
            id: entityId,
            label: e.type,
            name: e.name,
            group: "entity"
          });
          links.push({
            source: claimNode.id,
            target: entityId,
            label: "MENTIONS"
          });
        });

        // Add Article Nodes and Links
        data.semantic_results.forEach((a: any) => {
          const articleId = `article-${a.pmid}`;
          nodes.push({
            id: articleId,
            label: "Article",
            name: a.title,
            group: "article"
          });
          links.push({
            source: claimNode.id,
            target: articleId,
            label: "EVIDENCED_BY"
          });

          // Authors
          a.authors.forEach((author: string, idx: number) => {
            const authorId = `author-${author}-${idx}`;
            nodes.push({
              id: authorId,
              label: "Author",
              name: author,
              group: "author"
            });
            links.push({
              source: articleId,
              target: authorId,
              label: "AUTHORED_BY"
            });
          });
        });

        setGraphData({ nodes, links });
      });
  }, []);

   const handleClick = () => {
    // Trigger a success toast
    toast.success("Data saved successfully!");

    // Trigger an error toast
    // toast.error("Something went wrong!");
  };
 
  return (
    <>
      <div>
        <p>Hello World</p>
        <ul className="list-disc pl-5">
          <li>The article <a href='https://pubmed.ncbi.nlm.nih.gov/39936960/'>Modulating Neuroinflammation as a Prospective Therapeutic Target in Alzheimer's Disease</a> provides a comprehensive review of the role of microglia in Alzheimer's disease. It discusses how microglia secrete proinflammatory cytokines that accelerate neuronal death but also release anti-inflammatory cytokines and growth factors contributing to neuronal recovery and protection. This supports the claim that inflammation can protect neuronal cells in Alzheimer's disease.
          </li>
          <li>The article <a href='https://pubmed.ncbi.nlm.nih.gov/40025720/'>IL-34/TREM2 modulates microglia-mediated inflammation and provides neuroprotection in a mouse model of sporadic Alzheimer's disease</a> provides experimental evidence that the cytokine IL-34 suppresses microglial inflammation and provides neuroprotection in a mouse model of Alzheimer's disease. This further supports the claim.</li>
          <li>The article <a href='https://pubmed.ncbi.nlm.nih.gov/40381069/'>Microglial activation as a hallmark of neuroinflammation in Alzheimer's disease</a> discusses the dualistic nature of microglial activation, showcasing both inflammatory (M1) and anti-inflammatory (M2) phenotypes that fluctuate based on the surrounding microenvironment. This suggests that inflammation can have both detrimental and protective effects on neuronal cells in Alzheimer's disease.</li>
          </ul> 

<ul className="list-disc pl-5">
  <li>Item 1 with <a href="#">link</a></li>
  <li>Item 2</li>
</ul>

        <button 
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-200">
            Save
        </button>
      </div>

       <div className="p-4 bg-white shadow-md rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Knowledge Graph</h2>
          <div className="h-[600px] w-full border rounded-xl overflow-hidden">
            <ForceGraph2D
              graphData={graphData}
              nodeLabel="name"
              nodeAutoColorBy="group"
              linkLabel="label"
            />
          </div>
        </div>

    </>
   
  );
};

export default KgPageComponent;
