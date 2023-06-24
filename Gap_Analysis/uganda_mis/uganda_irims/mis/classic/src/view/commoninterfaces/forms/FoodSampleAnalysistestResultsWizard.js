
Ext.define('Admin.view.commoninterfaces.forms.FoodSampleAnalysistestResultsWizard', {
    extend: 'Ext.form.Panel',
    xtype: 'foodsampleanalysistestresultswizard',
    viewModel: 'commoninterfacesVm',   
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
    reference: 'foodsampleanalysistestresultswizard',
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
                action: 'quickNav',  scale:'medium',
                iconAlign: 'top',
                wizard: 'foodfoodsampleanalysistestresultswizard',
                handler: 'quickNavigationRenewal'
            },
          
            {
                step: 1,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Parameters',
                action: 'quickNav', scale:'medium',
                iconAlign: 'top',
                wizard: 'foodfoodsampleanalysistestresultswizard',
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
                    wizard: 'foodfoodsampleanalysistestresultswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizardpnl: 'foodfoodsampleanalysistestresultswizard',
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
                    wizard: 'foodfoodsampleanalysistestresultswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});