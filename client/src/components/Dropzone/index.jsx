import React, { ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


export const MyDropzone = (props) => {
  const { setFiles, multiple, className } = props
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles);
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
          console.log("wrong file");
        }
      } catch (error) {
        console.log('error_in_DZ: ', error);
      }
    })
    setTimeout(() => {
      setFiles(UpdatedFiles)
      // console.log('UpdatedFiles: ', UpdatedFiles);
    }, 100);

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple:multiple})

  return (
    <div {...getRootProps()} style={{ height: '100%', width: '100%'  }} className={className}>
      <input {...getInputProps()} accept='image/*' multiple={false}/>
      {props.children}
    </div>
  )
}
                                                                                                                                                                                                                                                                                                                                            
