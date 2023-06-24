/**
 * Created by Kip on 5/31/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.GroupSampleAnalysisDetailsPnl', {
    xtype: 'groupsampleanalysisdetailspnl',
    extend: 'Ext.form.Panel',
    controller: 'commoninterfacesVctr',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'groupsampleanalysisdetailspnl',
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
        items: [ {
            xtype: 'displayfield',
            name: 'group_no',
            fieldLabel: 'Laboratory Group Number',
            labelWidth: 120,
            width: 520,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
                'margin-top': '-2px'
            }
        }
        ]
    }],
    items: [{
        xtype: 'groupsampleanalysisdetailsgrid',
        
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
                pressed: true,
                text: 'Sample Information',
                action: 'quickNav',
                iconAlign: 'left',
                wizard: 'groupsampleanalysisdetailspnl',
                handler: 'quickNavigationSample'
            }, {
                step: 1,
                iconCls: 'fa fa-check',
                enableToggle: true,
                text: 'Sample Analysis Test Parameters',
                action: 'quickNav',
                iconAlign: 'left',
                wizard: 'groupsampleanalysisdetailspnl',
                handler: 'quickNavigationSample'
            }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text:'Back to List',
                    name:'samplegroupreturn',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    margin:5
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard: 'groupsampleanalysisdetailspnl',
                    handler: 'onPrevCardClickSample'
                },
                {
                    text: 'Save Sample Batch Group',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    action_url: 'saveSampleAnalysisRequestdetails',
                    action: 'btn_batchampledetails'
                },
                {
                    text: 'Submit Sample Test Request',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    childXtype: 'sampleanalysistestrequestsgrid',
                    winWidth: '50%',
                    handler: 'funcBatchSampleApplicationSubmissionWin'
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
                    wizard: 'groupsampleanalysisdetailspnl',
                    handler: 'onNextCardClickSample'
                }
            ]
        };
        me.callParent(arguments);
    }
});

