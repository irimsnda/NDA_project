Ext.define('Admin.view.commoninterfaces.ApplicationRaiseQueryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationRaiseQueryPnl',
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
                name: 'query_id'
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
                name: 'assessment_procedure_id'
            },{
                xtype: 'hiddenfield',
                name: 'classification_id'
            },{
                xtype: 'hiddenfield',
                name: 'prodclass_category_id'
            },{
                xtype: 'hiddenfield',
                name: 'product_subcategory_id'
            },{
                xtype: 'hiddenfield',
                name: 'product_origin_id'
            },{
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }],
    }],
    
    items:[{
            xtype: 'applicationRaiseQueryFrm',
            //title:'Raise Query',
        },{
            xtype: 'checklistItemsQueriesGrid',
            title: 'Request for Additional Information Items/Query/Findings Items'
        },{
            xtype: 'queryDocumentUploadGenericGrid',
            dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'button',
                text: 'Back',
                iconCls: 'x-fa fa-backward',
                nextStep: 1,
                name: 'doc_qryback_btn',
                ui: 'soft-green',
                handler: 'navigateQueryWizard'
            }]
        }]
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
                    text: 'Request for Additional Information/Query Details',
                    action: 'quickNav',
                    handler: 'navigateQueryWizard'
                },
                {
                    nextStep: 1,
                    iconCls: 'fa fa-question',
                    enableToggle: true,
                     text: 'Request for Additional Information Items/Query/Findings Items',
                    name: 'checklist_query_tab',
                    action: 'quickNav',
                    handler: 'navigateQueryWizard'
                }, {
                    nextStep: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Supporting/References Documents Documents Upload',
                    action: 'quickNav',
                    handler: 'navigateQueryWizard'
                }
            ]
        };
        me.callParent(arguments);
    }
});