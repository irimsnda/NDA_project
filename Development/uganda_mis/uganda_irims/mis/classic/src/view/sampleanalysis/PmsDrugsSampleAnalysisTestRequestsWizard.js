/**
 * Created by Kip on 3/26/2019.
 */
Ext.define('Admin.view.sampleanalysis.PmsDrugsSampleAnalysisTestRequestsWizard', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsdrugssampleanalysistestrequestswizard',
    controller: 'commoninterfacesVctr',
    bodyPadding: 1,
    height: 550,
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'pmsdrugssampleanalysistestrequestswizard',
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
            fieldLabel: 'Laboratory Reference No',
            labelWidth: 140,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        }, {
            xtype: 'displayfield',
            name: 'laboratory_no', labelWidth: 140,
            fieldLabel: 'Laboratory No',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        }, {
            xtype: 'displayfield',
            name: 'reference_no',
            labelWidth: 300,
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
        listeners: {
            tabchange: 'funcActiveSamplesOtherInformationTab'
        },
        items: [{
            xtype: 'sampledetailsfrm',
            itemId: 'sampledetailsfrm',
            title: 'Sample details'
        }, {
            title: 'Active Ingredients',
            xtype: 'pmssampleingredientsgrid'
        }]
    }, {
        xtype: 'sampleanalysistestparameterssgrid'
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
                text: 'Sample Information',
                action: 'quickNav',
                iconAlign: 'left',
                wizard: 'pmsdrugssampleanalysistestrequestswizard',
                handler: 'quickNavigationSample'
            },
                {
                    step: 1,
                    iconCls: 'fa fa-check',
                    enableToggle: true,
                    text: 'Sample Analysis Test Parameters',
                    action: 'quickNav',
                    iconAlign: 'left',
                    wizard: 'pmsdrugssampleanalysistestrequestswizard',
                    handler: 'quickNavigationSample'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard: 'pmsdrugssampleanalysistestrequestswizard',
                    handler: 'onPrevCardClickSample'
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
                    wizard: 'pmsdrugssampleanalysistestrequestswizard',
                    handler: 'onNextCardClickSample'
                }
            ]
        };
        me.callParent(arguments);
    }
});