import React, { useState, Suspense } from 'react';
import ModelViewer from './components/ModelViewer';
import ObjectTree from './components/ObjectTree';
import LoadingProgress from './components/LoadingProgress';
import 'antd/dist/reset.css'; // Import Antd styles

function App() {
  // Đặt file .glb vào thư mục public của dự án
  const myModelPath = './model.glb';
  const [showModel, setShowModel] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <button onClick={() => setShowModel(!showModel)} style={{ marginBottom: '20px', padding: '10px' }}>
        {showModel ? 'Ẩn Mô hình' : 'Hiển thị Mô hình'}
      </button>

      <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          {showModel && (
            <Suspense fallback={<LoadingProgress />}>
              <ModelViewer modelPath={myModelPath} />
            </Suspense>
          )}
        </div>

        {showModel && (
          <div style={{ width: '300px' }}>
            <Suspense fallback={<div>Đang tải cây đối tượng...</div>}>
              <ObjectTree modelPath={myModelPath} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;