Ext.define('Admin.view.commoninterfaces.ApplicationRaiseCAPAPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationRaiseCAPAPnl',
    controller: 'commoninterfacesVctr',
    // layout:'fit',
    itemId: 'applicationRaiseQueryPnlId',
    reference: 'applicationRaiseQueryPnlRef',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    layout: 'card',
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'hiddenfield',
                name: 'module_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'section_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'application_code'
            },{
                xtype: 'hiddenfield',
                name: 'application_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'inspection_capa_id'
            },{
                xtype: 'hiddenfield',
                name: 'invoice_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'process_id'
            },{
                xtype: 'hiddenfield',
                name: 'is_manager_review'
            },{
                xtype: 'hiddenfield',
                name: 'status_id'
            },{
                xtype: 'hiddenfield',
                name: 'product_origin_id'
            },{
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }],
    }],
    
    items:[{
            xtype: 'applicationraisecapafrm',
        },{
            xtype: 'capafindingchecklistgrid',//checklistItemsQueriesGrid
            title: 'CAPA Finding Items',
           
         }],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    nextStep: 0,
                    iconCls: 'fa fa-edit',
                    enableToggle: true,
                    pressed: true,
                    text: 'Request for CAPA Details',
                    action: 'quickNav',
                    handler: 'navigateCAPAREquestWizard'
                },
                {
                    nextStep: 1,
                    iconCls: 'fa fa-question',
                    enableToggle: true,
                     text:  'CAPA Finding Report and Response template',
                    name: 'checklist_query_tab',
                    action: 'quickNav',
                    handler: 'navigateCAPAREquestWizard'
                }
            ]
        };
        me.callParent(arguments);
    }
});