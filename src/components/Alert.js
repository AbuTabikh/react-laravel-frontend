 
import React from 'react';

function Alert() {
  return  (<div className="bg-teal-900 text-center py-4 lg:px-4">
  <div className="p-2 bg-teal-800 items-center text-teal-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-teal-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
      <span className="font-semibold mr-2 text-left flex-auto">Data updated successfully</span>
  </div>
</div>);
}
export default Alert;
