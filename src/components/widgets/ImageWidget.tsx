import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, ImageWidgetData } from '@/types'

interface ImageWidgetProps {
  widget: Widget
}

export function ImageWidget({ widget }: ImageWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as ImageWidgetData
  const [url, setUrl] = useState(data.url || '')
  const [imageError, setImageError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    updateWidget(widget.id, {
      data: { ...data, url },
    })
    setIsEditing(false)
    setImageError(false)
  }

  const handleCancel = () => {
    setUrl(data.url || '')
    setIsEditing(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="image-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="image-widget-editor">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter image URL..."
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: widget.style.textColor,
                border: `1px solid ${widget.style.borderColor}`,
                borderRadius: '4px',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
              }}
            />
            {url && (
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                {imageError ? (
                  <span style={{ color: widget.style.textColor, opacity: 0.5 }}>
                    Invalid URL or image failed to load
                  </span>
                ) : (
                  <img
                    src={url}
                    alt="Preview"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </div>
            )}
            <div className="editor-actions">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : url && !imageError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={url}
              alt="Widget image"
              onError={handleImageError}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: widget.style.textColor,
              opacity: 0.5,
            }}
          >
            {mode === 'edit' ? 'Click Edit to add image URL' : 'No image'}
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

