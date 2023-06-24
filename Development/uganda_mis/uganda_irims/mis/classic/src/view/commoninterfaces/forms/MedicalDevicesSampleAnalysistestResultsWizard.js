Ext.define('Admin.view.commoninterfaces.forms.MedicalDevicesSampleAnalysistestResultsWizard', {
    extend: 'Ext.form.Panel',
    xtype: 'medicaldevicessampleanalysistestresultsswizard',
    controller: 'commoninterfacesVctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    }, 
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'medicaldevicessampleanalysistestresultsswizard',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    items: [{
            xtype: 'panel',
            title: 'Sample Information'

    },{

        xtype: 'panel',
        title: 'Sample Test Request',
        
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
            items: [{
                step: 0,
                iconCls: 'fa fa-product-hunt',
                enableToggle: true,
                text: 'Sample Information',
                scale:'medium',
                iconAlign: 'top',
                action: 'quickNav', 
                wizard: 'medicaldevicessampleanalysistestresultsswizard',
                handler: 'quickNavigationRenewal'
            },
            
            {
                step: 1,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Parameters',
                action: 'quickNav', scale:'medium',
                iconAlign: 'top',
                wizard: 'medicaldevicessampleanalysistestresultsswizard',
                handler: 'quickNavigationRenewal'
            }
            ]
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
                    childXtype: 'sampleanalysistestrequestsgrid',
                    handler: 'funcReturnBackSampleTestAnalysisrequest'
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard: 'medicaldevicessampleanalysistestresultsswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizardpnl: 'medicaldevicessampleanalysistestresultsswizard',
                    action_url: 'saveRenAltProductReceivingBaseDetails',
                    handler: 'saveProductReceivingBaseDetails'
                },
                {
                    text: 'Submit Sample Test Request',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%',
                    handler: 'showReceivingApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard: 'medicaldevicessampleanalysistestresultsswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});