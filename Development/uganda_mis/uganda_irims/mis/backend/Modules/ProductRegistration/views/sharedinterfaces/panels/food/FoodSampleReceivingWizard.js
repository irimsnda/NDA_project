/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.FoodSampleReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.foodsamplereceivingwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'foodproductsdetailspnl'
        },
        {
            xtype: 'tabpanel',
            //layout: 'fit',
            items: [{
                xtype: 'productsSampledetailsGrid',
                title: 'Product Sample details'
            }]
        },
        {
            xtype: 'tabpanel',
            items: [{
                xtype: 'productDocUploadsGrid',
                title: 'Product Application Documents Submission'
            }]
        },{
            xtype: 'productscreeninggrid',
            title: 'Application Screening & Recommendation',
            listeners:{
                beforerender:function(grid){
                    btn = grid.down('button[name=raise_checklist_query]');
                    btn.setVisible(false);
                }
            }
        },
        
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        }
    ],
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
            items: [{
                step: 0,
                iconCls: 'fa fa-user',
                enableToggle: true,
                pressed: true,
                text: 'Product Information',
                action: 'quickNav',iconAlign: 'top',
                wizard:'foodsamplereceivingwizard',
                handler: 'quickNavigationSampleReceiving'
            },
            {
                step: 1,
                iconCls: 'fa fa-user',
                enableToggle: true,
                text: 'SAMPLE DETAILS',
                action: 'quickNav',iconAlign: 'top',
                wizard:'foodsamplereceivingwizard',
                handler: 'quickNavigationSampleReceiving'
            },
            {
                step: 2,
                iconCls: 'fa fa-home',
                enableToggle: true,
                text: 'DOCUMENTS UPLOAD',iconAlign: 'top',
                action: 'quickNav',wizard:'foodsamplereceivingwizard',
                handler: 'quickNavigationSampleReceiving'
            },
            {
                step: 3,
                iconCls: 'fa fa-home',
                enableToggle: true,
                text: 'APPLICATION SCREENING',
                iconAlign: 'top',
                action: 'quickNav', wizard: 'foodsamplereceivingwizard',
                handler: 'quickNavigationSampleReceiving'
            }]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },wizard:'foodsamplereceivingwizard',
                    handler: 'onPrevCardClickSample'
                },
                {
                    text: 'Update Product Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'productregistration/onSaveProductinformation',
                    handler: 'saveProductInformation'
                },'->',{
                    xtype: 'button',
                    text: "Raise/View Query & Responses(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-green',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                },{
                    text: 'Dossier Documents Submission Recommendation',
                    ui: 'soft-green',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_product_applications',
                    winWidth: '30%',
                    childXtype:'documentssubmissionrecommendationfrm',
                    winTitle:'Documents Submission Recommendation',
                    winWidth: '30%',
                    handler: 'saveSampleSubmissionRemarks'
                },  
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%',
                    handler: 'showSamplerecApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'foodsamplereceivingwizard',
                    handler: 'onNextCardClickSample'
                }
            ]
        };
        me.callParent(arguments);
    }
});
