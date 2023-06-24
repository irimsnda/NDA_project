/**
 * Created by Kip on 9/20/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.WorkflowDiagramContainer', {
    extend: 'Ext.Component',
    xtype: 'workflowdiagramcontainer',
    autoEl: {
        tag: 'iframe',
        style: 'height: 100%; width: 100%; overflow:hidden; border: none'
        //src: base_url + '/showWorkflow'
    },setSrc: function(src) {
      /*  if (this.rendered) {
            // equivalent to:
            // document.getElementById('myIFramePanel').src = src;
            Ext.get('myIFramePanel').set({
                src: src
            });
        } else {
            this.autoEl.src = src;
        }*/
    }
});