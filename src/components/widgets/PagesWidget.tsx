import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, PagesWidgetData, Page } from '@/types'

interface PagesWidgetProps {
  widget: Widget
}

export function PagesWidget({ widget }: PagesWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as PagesWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editPages, setEditPages] = useState(data.pages)
  const [currentEditPage, setCurrentEditPage] = useState(0)

  const handleSave = () => {
    updateWidget(widget.id, {
      data: {
        pages: editPages,
        currentPage: Math.min(data.currentPage, editPages.length - 1),
      },
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditPages(data.pages)
    setCurrentEditPage(0)
    setIsEditing(false)
  }

  const handleAddPage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}-${Math.random()}`,
      content: `# Page ${editPages.length + 1}\n\nContent goes here.`,
    }
    setEditPages([...editPages, newPage])
    setCurrentEditPage(editPages.length)
  }

  const handleDeletePage = (pageId: string) => {
    if (editPages.length <= 1) {
      alert('Cannot delete the last page')
      return
    }
    const newPages = editPages.filter((p) => p.id !== pageId)
    setEditPages(newPages)
    setCurrentEditPage(Math.min(currentEditPage, newPages.length - 1))
  }

  const handlePageContentChange = (pageId: string, content: string) => {
    const newPages = editPages.map((p) =>
      p.id === pageId ? { ...p, content } : p
    )
    setEditPages(newPages)
  }

  const handlePrevPage = () => {
    if (data.currentPage > 0) {
      updateWidget(widget.id, {
        data: { ...data, currentPage: data.currentPage - 1 },
      })
    }
  }

  const handleNextPage = () => {
    if (data.currentPage < data.pages.length - 1) {
      updateWidget(widget.id, {
        data: { ...data, currentPage: data.currentPage + 1 },
      })
    }
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="pages-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="pages-widget-editor">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Page {currentEditPage + 1} of {editPages.length}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    if (currentEditPage > 0) {
                      setCurrentEditPage(currentEditPage - 1)
                    }
                  }}
                  disabled={currentEditPage === 0}
                  className="cancel-button"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  ← Prev
                </button>
                <button
                  onClick={handleAddPage}
                  className="save-button"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  + Add
                </button>
                <button
                  onClick={() => {
                    if (currentEditPage < editPages.length - 1) {
                      setCurrentEditPage(currentEditPage + 1)
                    }
                  }}
                  disabled={currentEditPage === editPages.length - 1}
                  className="cancel-button"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  Next →
                </button>
              </div>
            </div>
            <textarea
              value={editPages[currentEditPage]?.content || ''}
              onChange={(e) =>
                handlePageContentChange(editPages[currentEditPage].id, e.target.value)
              }
              style={{
                width: '100%',
                height: '200px',
                padding: '0.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: widget.style.textColor,
                border: `1px solid ${widget.style.borderColor}`,
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                resize: 'vertical',
              }}
            />
            {editPages.length > 1 && (
              <button
                onClick={() => handleDeletePage(editPages[currentEditPage].id)}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  color: '#f87171',
                  border: '1px solid #f87171',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Delete Current Page
              </button>
            )}
            <div className="editor-actions" style={{ marginTop: '0.5rem' }}>
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="pages-display">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
                paddingBottom: '0.5rem',
                borderBottom: `1px solid ${widget.style.borderColor}`,
              }}
            >
              <button
                onClick={handlePrevPage}
                disabled={data.currentPage === 0 || mode === 'edit'}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: mode === 'edit' || data.currentPage === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' || data.currentPage === 0 ? 'default' : 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                ← Prev
              </button>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Page {data.currentPage + 1} of {data.pages.length}
              </div>
              <button
                onClick={handleNextPage}
                disabled={data.currentPage >= data.pages.length - 1 || mode === 'edit'}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor:
                    mode === 'edit' || data.currentPage >= data.pages.length - 1
                      ? 'transparent'
                      : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor:
                    mode === 'edit' || data.currentPage >= data.pages.length - 1
                      ? 'default'
                      : 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Next →
              </button>
            </div>
            <div
              className="markdown-content"
              style={{
                overflow: 'auto',
                maxHeight: 'calc(100% - 3rem)',
              }}
            >
              <ReactMarkdown>
                {data.pages[data.currentPage]?.content || 'No content'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

