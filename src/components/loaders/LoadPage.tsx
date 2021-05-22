import React, {FC, ReactElement, ReactNode} from "react";
import CircularProgress, {CircularProgressProps} from "@material-ui/core/CircularProgress/CircularProgress";
import {LoadDots} from "./LoadDots";
import { baseColors } from '../../services'

export const PageLoaderMsg:FC = ({...props}) => {
  if (!props.children)
    return null;

  return (
    <p style={{color: baseColors.btn.secondaryDark}} {...props}/>
  )
}

export const PageLoader:FC<CircularProgressProps> = ({...props}) => {
  return (
    <CircularProgress color={"secondary"} {...props} />
  )
};

// for loading page
export const PageLoadingContent = ({msg="Loading", ...props}:{msg?:ReactNode, [x:string]:any}):ReactElement|null => {
  return (
    <>
      <PageLoader {...props}/>

      <div style={{width: "100%", margin: 15}}/>

      <PageLoaderMsg>
        {msg}<LoadDots/>
      </PageLoaderMsg>
    </>
  )
}

// for components while loading
export const Loading = ({loading, msg="", ...props}:{loading?:boolean, msg?:ReactNode, [x:string]:any}):ReactElement|null => {
  if (!loading)
    return null;

  return (
    <div {...props}>
      <PageLoadingContent msg={msg}/>
    </div>
  )
}