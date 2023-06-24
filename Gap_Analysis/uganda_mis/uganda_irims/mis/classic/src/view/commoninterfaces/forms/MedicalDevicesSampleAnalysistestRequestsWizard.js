Ext.define('Admin.view.commoninterfaces.forms.MedicalDevicesSampleAnalysistestRequestsWizard', {
    extend: 'Ext.form.Panel',
    xtype: 'medicaldevicessampleanalysistestrequestswizard',
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
    reference: 'medicaldevicessampleanalysistestrequestswizard',
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
                wizard: 'medicaldevicessampleanalysistestrequestswizard',
                handler: 'quickNavigationRenewal'
            },
            
            {
                step: 1,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Parameters',
                action: 'quickNav', scale:'medium',
                iconAlign: 'top',
                wizard: 'medicaldevicessampleanalysistestrequestswizard',
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
                    wizard: 'medicaldevicessampleanalysistestrequestswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Sample Test Request',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    action_url: 'saveSampleAnalysisRequestdetails',
                    action: 'btn_savesampledetails'
                },
                {
                        text: 'Submit Sample Test Request',
                        ui: 'soft-purple',
                        iconCls: 'fa fa-check',
                        name: 'process_submission_btn',
                        storeID: 'productregistrationstr',
                        table_name: 'tra_product_applications',
                        childXtype: 'sampleanalysistestrequestsgrid',
                        winWidth: '50%',
                        handler: 'funcSampleApplicationSubmissionWin'
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
                    wizard: 'medicaldevicessampleanalysistestrequestswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});