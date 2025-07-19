import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  addEdge, 
  useNodesState, 
  useEdgesState,
  BackgroundVariant 
} from 'react-flow-renderer';
import { motion } from 'framer-motion';

// Custom Node Components - Simplified for better debugging
const PromptNode = ({ data, selected }: any) => {
  console.log(`PromptNode rendering - isExecuting: ${data.isExecuting}`);
  
  return (
    <div
      className={`px-6 py-4 shadow-2xl rounded-xl border min-w-[200px] transition-all duration-1000 ${
        data.isExecuting 
          ? 'bg-yellow-500 border-yellow-300 scale-125 shadow-yellow-400/50 shadow-2xl ring-8 ring-yellow-400/90' 
          : 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-400/30'
      } ${selected ? 'ring-2 ring-purple-400' : ''}`}
      style={{
        transform: data.isExecuting ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full transition-all duration-500 ${
          data.isExecuting 
            ? 'animate-bounce bg-yellow-200 shadow-lg' 
            : 'animate-pulse bg-purple-300'
        }`}></div>
        <span className={`font-bold text-sm ${
          data.isExecuting ? 'text-yellow-900' : 'text-white'
        }`}>AI PROMPT</span>
      </div>
      <div className={`text-xs mb-2 ${
        data.isExecuting ? 'text-yellow-800' : 'text-purple-100'
      }`}>{data.label}</div>
      <div className={`text-xs opacity-75 ${
        data.isExecuting ? 'text-yellow-700' : 'text-purple-200'
      }`}>{data.description}</div>
      {data.isExecuting && (
        <div className="mt-3 text-yellow-900 text-lg font-bold animate-pulse bg-yellow-300 p-2 rounded-lg text-center">
          ⚡ EXECUTING NOW! ⚡
        </div>
      )}
    </div>
  );
};

const ApiNode = ({ data, selected }: any) => {
  console.log(`ApiNode rendering - isExecuting: ${data.isExecuting}`);
  
  return (
    <div
      className={`px-6 py-4 shadow-2xl rounded-xl border min-w-[200px] transition-all duration-1000 ${
        data.isExecuting 
          ? 'bg-yellow-500 border-yellow-300 scale-125 shadow-yellow-400/50 shadow-2xl ring-8 ring-yellow-400/90' 
          : 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400/30'
      } ${selected ? 'ring-2 ring-blue-400' : ''}`}
      style={{
        transform: data.isExecuting ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full transition-all duration-500 ${
          data.isExecuting 
            ? 'animate-bounce bg-yellow-200 shadow-lg' 
            : 'animate-pulse bg-blue-300'
        }`}></div>
        <span className={`font-bold text-sm ${
          data.isExecuting ? 'text-yellow-900' : 'text-white'
        }`}>API CALL</span>
      </div>
      <div className={`text-xs mb-2 ${
        data.isExecuting ? 'text-yellow-800' : 'text-blue-100'
      }`}>{data.label}</div>
      <div className={`text-xs opacity-75 ${
        data.isExecuting ? 'text-yellow-700' : 'text-blue-200'
      }`}>{data.description}</div>
      {data.isExecuting && (
        <div className="mt-3 text-yellow-900 text-lg font-bold animate-pulse bg-yellow-300 p-2 rounded-lg text-center">
          🔄 FETCHING DATA! 🔄
        </div>
      )}
    </div>
  );
};

const DecisionNode = ({ data, selected }: any) => {
  console.log(`DecisionNode rendering - isExecuting: ${data.isExecuting}`);
  
  return (
    <div
      className={`px-6 py-4 shadow-2xl rounded-xl border min-w-[200px] transition-all duration-1000 ${
        data.isExecuting 
          ? 'bg-yellow-500 border-yellow-300 scale-125 shadow-yellow-400/50 shadow-2xl ring-8 ring-yellow-400/90' 
          : 'bg-gradient-to-br from-amber-600 to-orange-700 border-amber-400/30'
      } ${selected ? 'ring-2 ring-amber-400' : ''}`}
      style={{
        transform: data.isExecuting ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full transition-all duration-500 ${
          data.isExecuting 
            ? 'animate-bounce bg-yellow-200 shadow-lg' 
            : 'animate-pulse bg-amber-300'
        }`}></div>
        <span className={`font-bold text-sm ${
          data.isExecuting ? 'text-yellow-900' : 'text-white'
        }`}>DECISION</span>
      </div>
      <div className={`text-xs mb-2 ${
        data.isExecuting ? 'text-yellow-800' : 'text-amber-100'
      }`}>{data.label}</div>
      <div className={`text-xs opacity-75 ${
        data.isExecuting ? 'text-yellow-700' : 'text-amber-200'
      }`}>{data.description}</div>
      {data.isExecuting && (
        <div className="mt-3 text-yellow-900 text-lg font-bold animate-pulse bg-yellow-300 p-2 rounded-lg text-center">
          🤔 ANALYZING! 🤔
        </div>
      )}
    </div>
  );
};

const OutputNode = ({ data, selected }: any) => {
  console.log(`OutputNode rendering - isExecuting: ${data.isExecuting}`);
  
  return (
    <div
      className={`px-6 py-4 shadow-2xl rounded-xl border min-w-[200px] transition-all duration-1000 ${
        data.isExecuting 
          ? 'bg-yellow-500 border-yellow-300 scale-125 shadow-yellow-400/50 shadow-2xl ring-8 ring-yellow-400/90' 
          : 'bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-400/30'
      } ${selected ? 'ring-2 ring-emerald-400' : ''}`}
      style={{
        transform: data.isExecuting ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full transition-all duration-500 ${
          data.isExecuting 
            ? 'animate-bounce bg-yellow-200 shadow-lg' 
            : 'animate-pulse bg-emerald-300'
        }`}></div>
        <span className={`font-bold text-sm ${
          data.isExecuting ? 'text-yellow-900' : 'text-white'
        }`}>OUTPUT</span>
      </div>
      <div className={`text-xs mb-2 ${
        data.isExecuting ? 'text-yellow-800' : 'text-emerald-100'
      }`}>{data.label}</div>
      <div className={`text-xs opacity-75 ${
        data.isExecuting ? 'text-yellow-700' : 'text-emerald-200'
      }`}>{data.description}</div>
      {data.isExecuting && (
        <div className="mt-3 text-yellow-900 text-lg font-bold animate-pulse bg-yellow-300 p-2 rounded-lg text-center">
          📊 GENERATING! 📊
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  promptNode: PromptNode,
  apiNode: ApiNode,
  decisionNode: DecisionNode,
  outputNode: OutputNode,
};

const AgentBuilder = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentExecutingNode, setCurrentExecutingNode] = useState<string | null>(null);
  const [executionStatus, setExecutionStatus] = useState('');
  const [executionProgress, setExecutionProgress] = useState(0);
  
  // Luxurious Business Intelligence Agent Example
  const initialNodes = [
    {
      id: '1',
      type: 'promptNode',
      position: { x: 100, y: 50 },
      data: {
        label: 'Market Research Agent',
        description: 'Analyze market trends and competitor data',
        isExecuting: false
      },
    },
    {
      id: '2',
      type: 'apiNode',
      position: { x: 400, y: 50 },
      data: {
        label: 'Financial Data API',
        description: 'Fetch real-time market data from Bloomberg API',
        isExecuting: false
      },
    },
    {
      id: '3',
      type: 'promptNode',
      position: { x: 700, y: 50 },
      data: {
        label: 'Sentiment Analysis',
        description: 'Analyze market sentiment from news and social media',
        isExecuting: false
      },
    },
    {
      id: '4',
      type: 'decisionNode',
      position: { x: 400, y: 200 },
      data: {
        label: 'Risk Assessment',
        description: 'Evaluate investment risk based on analysis',
        isExecuting: false
      },
    },
    {
      id: '5',
      type: 'promptNode',
      position: { x: 100, y: 350 },
      data: {
        label: 'Conservative Strategy',
        description: 'Generate low-risk investment recommendations',
        isExecuting: false
      },
    },
    {
      id: '6',
      type: 'promptNode',
      position: { x: 700, y: 350 },
      data: {
        label: 'Aggressive Strategy',
        description: 'Generate high-growth investment recommendations',
        isExecuting: false
      },
    },
    {
      id: '7',
      type: 'apiNode',
      position: { x: 400, y: 500 },
      data: {
        label: 'Portfolio Builder',
        description: 'Create optimized portfolio via Robinhood API',
        isExecuting: false
      },
    },
    {
      id: '8',
      type: 'outputNode',
      position: { x: 400, y: 650 },
      data: {
        label: 'Investment Report',
        description: 'Generate comprehensive PDF report with recommendations',
        isExecuting: false
      },
    },
  ];

  const initialEdges = [
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2', 
      animated: true, 
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e2-3', 
      source: '2', 
      target: '3', 
      animated: true, 
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e1-4', 
      source: '1', 
      target: '4', 
      animated: true, 
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e3-4', 
      source: '3', 
      target: '4', 
      animated: true, 
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e4-5', 
      source: '4', 
      target: '5', 
      animated: true, 
      style: { stroke: '#f59e0b', strokeWidth: 3 }, 
      label: 'Low Risk',
      labelStyle: { fill: '#f59e0b', fontWeight: 600, fontSize: '12px' },
      type: 'smoothstep'
    },
    { 
      id: 'e4-6', 
      source: '4', 
      target: '6', 
      animated: true, 
      style: { stroke: '#ef4444', strokeWidth: 3 }, 
      label: 'High Risk',
      labelStyle: { fill: '#ef4444', fontWeight: 600, fontSize: '12px' },
      type: 'smoothstep'
    },
    { 
      id: 'e5-7', 
      source: '5', 
      target: '7', 
      animated: true, 
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e6-7', 
      source: '6', 
      target: '7', 
      animated: true, 
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      type: 'smoothstep'
    },
    { 
      id: 'e7-8', 
      source: '7', 
      target: '8', 
      animated: true, 
      style: { stroke: '#10b981', strokeWidth: 3 },
      type: 'smoothstep'
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 3 } }, eds));
  }, [setEdges]);

  const executeAgent = async () => {
    console.log("🚀 EXECUTE AGENT CLICKED!");
    
    if (isExecuting) {
      console.log("⚠️ Already executing, returning early");
      return;
    }
    
    console.log("🎬 STARTING EXECUTION SEQUENCE...");
    setIsExecuting(true);
    setExecutionStatus('🔥 AGENT EXECUTION STARTED 🔥');
    setExecutionProgress(0);
    
    const executionOrder = ['1', '2', '3', '4', '5', '7', '8'];
    const totalNodes = executionOrder.length;
    
    try {
      for (let i = 0; i < executionOrder.length; i++) {
        const nodeId = executionOrder[i];
        const progress = ((i + 1) / totalNodes) * 100;
        
        console.log(`🎯 EXECUTING NODE ${nodeId} (${i + 1}/${totalNodes})`);
        setCurrentExecutingNode(nodeId);
        setExecutionStatus(`PROCESSING NODE ${nodeId}: ${getNodeTitle(nodeId)}`);
        setExecutionProgress(progress);
        
        // UPDATE NODES TO SHOW EXECUTION STATE
        setNodes((currentNodes) =>
          currentNodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              isExecuting: node.id === nodeId
            }
          }))
        );
        
        // Wait 3 seconds for this node
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // RESET NODE EXECUTION STATE
        setNodes((currentNodes) =>
          currentNodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              isExecuting: false
            }
          }))
        );
        
        console.log(`✅ NODE ${nodeId} COMPLETED`);
      }
      
      console.log("🎉 ALL NODES PROCESSED!");
      setExecutionStatus('🎉 EXECUTION COMPLETE! Investment strategy generated successfully! 🎉');
      setCurrentExecutingNode(null);
      setExecutionProgress(100);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsExecuting(false);
        setExecutionStatus('');
        setExecutionProgress(0);
        console.log("🔄 EXECUTION STATE RESET");
      }, 3000);
      
    } catch (error) {
      console.error("💥 EXECUTION ERROR:", error);
      setExecutionStatus('❌ Execution Failed');
      setIsExecuting(false);
      setCurrentExecutingNode(null);
    }
  };

  const getNodeTitle = (nodeId: string) => {
    const nodeMap: { [key: string]: string } = {
      '1': 'Market Research',
      '2': 'Data Processing', 
      '3': 'Sentiment Analysis',
      '4': 'Risk Assessment',
      '5': 'Conservative Strategy',
      '6': 'Aggressive Strategy',
      '7': 'Portfolio Optimization', 
      '8': 'Final Report'
    };
    return nodeMap[nodeId] || `Node ${nodeId}`;
  };

  return (
    <div className="w-full min-h-screen lg:h-[700px] relative overflow-hidden">
      {/* MAIN EXECUTION STATUS OVERLAY - Responsive */}
      {isExecuting && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-16 sm:top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-50 px-4"
        >
          <div className="bg-gradient-to-r from-red-500/95 to-orange-500/95 backdrop-blur-xl border-2 border-red-300 rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 shadow-2xl w-full max-w-[500px]">
            <div className="text-center">
              <div className="text-white text-base sm:text-lg md:text-xl font-bold animate-pulse mb-2 sm:mb-3">
                🔥 {executionStatus} 🔥
              </div>
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-1 bg-black/30 rounded-full h-3 sm:h-4">
                  <div 
                    className="bg-gradient-to-r from-yellow-300 to-orange-300 h-3 sm:h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${executionProgress}%` }}
                  ></div>
                </div>
                <span className="text-white font-bold text-sm sm:text-lg min-w-[40px] sm:min-w-[50px]">{Math.round(executionProgress)}%</span>
              </div>
              {currentExecutingNode && (
                <div className="text-yellow-200 text-sm sm:text-base animate-bounce font-semibold">
                  ⚡ NODE {currentExecutingNode} ACTIVE ⚡
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}      {/* NODE EXECUTION INDICATORS - Responsive Positioning */}
      {isExecuting && currentExecutingNode && (
        <>
          {initialNodes.map((node) => {
            if (node.id === currentExecutingNode) {
              return (
                <motion.div
                  key={`indicator-${node.id}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: 1,
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute z-40 pointer-events-none hidden sm:block"
                  style={{
                    left: `${node.position.x + 85}px`,
                    top: `${node.position.y + 55}px`,
                  }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                    <span className="text-white text-2xl sm:text-3xl font-bold animate-pulse">⚡</span>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </>
      )}

      {/* Luxury Control Panel - Responsive */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-20 px-2 sm:px-0"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs sm:text-sm font-semibold">Investment AI Agent</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-white/20"></div>
            
            <button
              onClick={executeAgent}
              disabled={isExecuting}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isExecuting 
                  ? 'bg-amber-500/20 text-amber-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isExecuting ? '⚡ Executing...' : '🚀 Execute Agent'}
            </button>
            
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>8 Nodes</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">$47.2K Analysis</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Stats - Responsive */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-16 sm:top-4 left-2 sm:left-4 z-20"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 shadow-2xl">
          <div className="text-white text-xs font-semibold mb-2">PERFORMANCE</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-2">
              <span className="text-white/60">Accuracy:</span>
              <span className="text-emerald-400">94.7%</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-white/60">Speed:</span>
              <span className="text-blue-400">2.3s</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-white/60">Cost:</span>
              <span className="text-purple-400">$0.12</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Node Palette - Responsive */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-16 sm:top-4 right-2 sm:right-4 z-20"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 shadow-2xl">
          <div className="text-white text-xs font-semibold mb-2 sm:mb-3">NODE PALETTE</div>
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/10 p-1.5 sm:p-2 rounded">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-white/80 text-xs">AI Prompt</span>
            </div>
            <div className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/10 p-1.5 sm:p-2 rounded">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-white/80 text-xs">API Call</span>
            </div>
            <div className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/10 p-1.5 sm:p-2 rounded">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-white/80 text-xs">Decision</span>
            </div>
            <div className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white/10 p-1.5 sm:p-2 rounded">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-white/80 text-xs">Output</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#374151" 
        />
        <Controls 
          className="bg-black/80 border border-white/20 rounded-lg"
        />
        <MiniMap 
          className="bg-black/80 border border-white/20 rounded-lg"
          maskColor="rgb(0, 0, 0, 0.8)"
        />
      </ReactFlow>

      {/* Debug Info - Responsive */}
      <div className="absolute bottom-2 left-2 z-50 text-xs text-white bg-black/80 p-2 rounded hidden sm:block">
        <div>Status: {isExecuting ? '🔥 EXECUTING' : '⭐ READY'}</div>
        <div>Node: {currentExecutingNode || 'None'}</div>
        <div>Progress: {executionProgress.toFixed(0)}%</div>
      </div>
    </div>
  );
};

export default AgentBuilder;
