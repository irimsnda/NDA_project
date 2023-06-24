/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.AnalysisContainerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'analysiscontainerpanel',
    controller: 'surveillancevctr',
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            items:[
                {
                    xtype: 'combo',
                    fieldLabel: 'Sample Analysis Recommendation',
                    labelWidth: 150,
                    width: 480,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    name: 'decision_id',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams:{
                                        table_name: 'par_pmsanalysis_decisions'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    },
                    labelStyle: 'font-weight:bold'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Recommendation Remarks',
                    labelWidth: 190,
                    width: 500,
                    name: 'comments',
                    labelStyle: 'font-weight:bold'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'analysis_type_id',
                    value: 3
                },
                {
                    xtype: 'button',
                    ui: 'soft-purple',
                    text: 'Save Recommendation',
                    iconCls: 'x-fa fa-save',
                    handler: 'savePIRRecommendation'
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    ui: 'soft-purple',
                    text: 'Analysis Report',
                    iconCls: 'x-fa fa-file-pdf-o',
                    handler: ''
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'pirtabpanel'
        }
    ]
});