Ext.define('Admin.view.commoninterfaces.ApplicationReinspectionRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationReinspectionRequestPnl',
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
            xtype: 'applicationreinspectonreqfrm',
        },{
            xtype: 'reinspectionsrequestsitemsgrid', 
            title: 'RE-Inspection Reasons Items',
           
        }],
 showApplicationChecklistRevisions: function(btn){
        var mainTabPanel = this.getMainTabPanel(),
            panel = mainTabPanel.getActiveTab(),
            grid = btn.up('grid'),
            workflow_stage_id = panel.down('hiddenfield[name=workflow_stage_id]').getValue(), 
            application_code = panel.down('hiddenfield[name=active_application_code]').getValue(),
            child = Ext.widget('checklistRevisionsGrid');
        child.is_auditor_checklist = grid.is_auditor_checklist;
        child.down('hiddenfield[name=application_code]').setValue(application_code);
        child.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        funcShowCustomizableWindow('Checklist Revisions', '70%', child, 'customizablewindow');
        
    },
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
                    text: 'Request for Re-Inspection Information Details',
                    action: 'quickNav',
                    handler: 'navigateQueryWizard'
                }, {
                    nextStep: 1,
                    iconCls: 'fa fa-question',
                    enableToggle: true,
                     text: 'Request for Re-Inspection Information Items/Query/Findings Items',
                    name: 'checklist_query_tab',
                    action: 'quickNav',
                    handler: 'navigateQueryWizard'
                }
            ]
        };
        me.callParent(arguments);
    }
});