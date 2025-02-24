import { useParams } from "react-router-dom";
import { useState } from "react";
import { Rnd } from "react-rnd";

export default function ProjectView() {
  const { projectName } = useParams();
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      text: type,
      color: "#FFFFFF",
      backgroundColor: "#000000",
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      gluedTo: null,
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id, key, value) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, [key]: value } : el))
    );
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedElement(null);
  };

  const handleCtrlClick = (e, clickedElement) => {
    if (e.ctrlKey) {
      if (!selectedElement) {
        setSelectedElement(clickedElement);
      } else if (selectedElement.id !== clickedElement.id) {
        if (clickedElement.gluedTo === selectedElement.id) {
          updateElement(clickedElement.id, "gluedTo", null);
        } else {
          updateElement(clickedElement.id, "gluedTo", selectedElement.id);
        }
        setSelectedElement(null);
      } else {
        setSelectedElement(null);
      }
    } else {
      setSelectedElement(null);
    }
  };

  const handleDrag = (e, d, el) => {
    const dx = d.x - el.x;
    const dy = d.y - el.y;

    updateElement(el.id, "x", d.x);
    updateElement(el.id, "y", d.y);

    // Move glued elements
    elements.forEach((child) => {
      if (child.gluedTo === el.id) {
        updateElement(child.id, "x", child.x + dx);
        updateElement(child.id, "y", child.y + dy);
      }
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-5xl text-primary font-techno mb-4">Project: {projectName}</h1>

      <div className="flex w-full justify-center gap-6">
        {/* Normalized Screen Preview */}
        <div className="w-[70%] h-[45vw] max-w-[1280px] max-h-[720px] bg-border border-4 border-primary relative shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-full bg-white relative overflow-auto">
            {elements.map((el) => (
              <Rnd
                key={el.id}
                size={{ width: el.width, height: el.height }}
                position={{ x: el.x, y: el.y }}
                bounds="parent"
                dragGrid={[20, 20]}
                resizeGrid={[20, 20]}
                onDragStop={(e, d) => handleDrag(e, d, el)}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateElement(el.id, "width", ref.offsetWidth);
                  updateElement(el.id, "height", ref.offsetHeight);
                  updateElement(el.id, "x", position.x);
                  updateElement(el.id, "y", position.y);
                }}
                onClick={(e) => handleCtrlClick(e, el)}
                className={`border-2 rounded-lg flex items-center justify-center cursor-pointer ${el.gluedTo ? 'border-green-500' : 'border-primary'} ${selectedElement && selectedElement.id === el.id ? 'opacity-60' : ''}`}
                style={{ backgroundColor: el.backgroundColor, transform: 'none' }}
              >
                <textarea
                  value={el.text}
                  onChange={(e) => updateElement(el.id, "text", e.target.value)}
                  className="w-full h-full bg-transparent text-center text-white focus:outline-none resize-none overflow-auto"
                  style={{ color: el.color, wordWrap: "break-word", overflowWrap: "break-word" }}
                />
              </Rnd>
            ))}
            <p className="text-2xl text-text absolute bottom-2 left-2">Project Preview Area</p>
          </div>
        </div>

        {/* HUD Panel on Right */}
        <div className="w-1/5 flex flex-col gap-4 justify-center relative">
          {/* Floating Divider */}
          <div className="w-4/5 h-1 bg-primary mx-auto my-4"></div>

          {/* HUD Elements */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div
              className="w-[45%] h-24 bg-background text-primary rounded-lg border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-primary_hover"
              onClick={() => addElement("Textbox")}
            >
              Textbox
            </div>
            <div
              className="w-[45%] h-24 bg-background text-primary rounded-lg border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-primary_hover"
              onClick={() => addElement("Botón")}
            >
              Botón
            </div>
          </div>

          {/* Customization Panel */}
          {selectedElement && (
            <div className="mt-6 p-4 bg-border rounded-lg">
              <h3 className="text-primary font-techno text-center mb-2">Customize</h3>
              <input
                type="text"
                className="w-full p-2 mb-2 rounded border border-primary"
                value={selectedElement.text}
                onChange={(e) => updateElement(selectedElement.id, "text", e.target.value)}
                placeholder="Edit text"
              />
              <input
                type="color"
                className="w-full p-2 mb-2 rounded border border-primary"
                value={selectedElement.color}
                onChange={(e) => updateElement(selectedElement.id, "color", e.target.value)}
              />
              <input
                type="color"
                className="w-full p-2 mb-2 rounded border border-primary"
                value={selectedElement.backgroundColor}
                onChange={(e) => updateElement(selectedElement.id, "backgroundColor", e.target.value)}
              />
              <button
                className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteElement(selectedElement.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-text mt-4">This is a scaled preview of how your project would appear on a standard monitor.</p>
    </div>
  );
}
