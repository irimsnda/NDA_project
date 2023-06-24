/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.GroupSampleAnalysisPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'groupsampleanalysispnl',
    layout:'fit',
    items: [
        {
          xtype:'panel',layout:'fit',
          itemId:'groupsampleanalysispnl',
          items:[{
                xtype: 'groupsampleanalysisgrid'
           }]  
        },{
            xtype:'hiddenfield',
            name:'section_id'
        },{
            xtype:'hiddenfield',
            name:'analysis_type_id'
        }
    ]
});