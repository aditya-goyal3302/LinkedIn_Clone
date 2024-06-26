import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


export const MyDropzone = (props) => {
  const { setFiles, multiple, className } = props
  const onDrop = useCallback(async (acceptedFiles) => {
    var UpdatedFiles= [] 
    acceptedFiles.forEach(async(file) => {
      try {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          const reader = new FileReader()
          reader.onload = (e) => {
            UpdatedFiles.push({ data: file, url: e.target?.result  })
          }
          reader.readAsDataURL(file)
        }
        else {
        }
      } catch (error) {
      }
    })
    setTimeout(() => {
      setFiles(UpdatedFiles)
    }, 100);

  },[])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple:multiple})

  return (
    <div {...getRootProps()} style={{ height: '100%', width: '100%'  }} className={className}>
      <input {...getInputProps()} accept='image/*' multiple={false}/>
      {props.children}
    </div>
  )
}
                                                                                                                                                                                                                                                                                                                                            
