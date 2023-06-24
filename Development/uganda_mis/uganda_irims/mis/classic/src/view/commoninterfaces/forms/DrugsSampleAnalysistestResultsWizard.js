Ext.define('Admin.view.commoninterfaces.forms.DrugsSampleAnalysistestResultsWizard', {
    extend: 'Ext.form.Panel',
    xtype: 'drugssampleanalysistestresultswizard',
    controller: 'commoninterfacesVctr',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'drugssampleanalysistestresultswizard',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                ui: 'footer',
                height: 35,
                defaults: {
                    labelAlign: 'right',
                    labelStyle: "color:#595959"
                },
                items: ['->', {
                    xtype: 'displayfield',
                    name: 'laboratoryreference_no',
                    fieldLabel: 'Laboratory Ref No',
                    labelWidth: 140,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'displayfield',
                    name: 'laboratory_no',
                    labelWidth: 140,
                    fieldLabel: 'Laboratory No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'displayfield',
                    name: 'reference_no',
                    hidden: true,
                    labelWidth: 130,
                    fieldLabel: 'Application Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },
            ]
        }],
    items: [{
            xtype: 'tabpanel',
            itemId:'sampletabpanel',
        margin: 1,
            listeners: {
                tabchange: 'funcActiveSamplesOtherInformationTab' 
            },
            items:[{
                xtype: 'drugssampledetailsfrm',
                itemId:'sampledetailsfrm',
                title: 'Sample details'
            },{
                xtype: 'limssampleingredientsgrid',
                title: 'Active Ingredients'
            }]
    },{
        xtype: 'sampleanalysistestparameterssgrid',
        title: 'Sample Test Request'
    },{
        xtype: 'sampleanalysistestrequestsprocessesgrid',
        title: 'Sample Test Request Processes'

    },{

        xtype: 'sampleanalysistestresultsgrid',
        title: 'Sample Test Request Results'

    }],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
           defaultButtonUI: 'wizard-' + this.colorScheme,
           cls: 'wizardprogressbar',
            style: {
                "background-color": "#669137"
            },
            bodyStyle: {
                "background-color": "#669137"
            },
            layout: {
                pack: 'center'
            },
            items: [{
                step: 0,
                iconCls: 'fa fa-edit',
                enableToggle: true,
                pressed: true,
                text: 'Sample Information',
                action: 'quickNav',  
                iconAlign: 'left',
                wizard: 'drugssampleanalysistestresultswizard',
                handler: 'quickNavigationSample'
            },
            {
                step: 1,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Parameters',
                action: 'quickNav', 
                iconAlign: 'left',
                wizard: 'drugssampleanalysistestresultswizard',
                handler: 'quickNavigationSample'
            }, {
                step: 2,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Analysis process',
                action: 'quickNav', 
                iconAlign: 'left',
                wizard: 'drugssampleanalysistestresultswizard',
                handler: 'quickNavigationSample'
            }, {
                step: 3,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Analysis Results',
                action: 'quickNav', 
                iconAlign: 'left',
                wizard: 'drugssampleanalysistestresultswizard',
                handler: 'quickNavigationSample'
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
                    wizard: 'drugssampleanalysistestresultswizard',
                    handler: 'onPrevCardClickSample'
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
                    wizard: 'drugssampleanalysistestresultswizard',
                    handler: 'onNextCardClickSample'
                }
            ]
        };
        me.callParent(arguments);
    }
});