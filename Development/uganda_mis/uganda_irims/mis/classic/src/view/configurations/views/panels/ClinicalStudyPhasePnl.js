Ext.define('Admin.view.configurations.views.panels.ClinicalStudyPhasePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalStudyPhase',
    title: 'Clinical Study Phase',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'clinicalStudyPhaseGrid'
        }
    ]
});
