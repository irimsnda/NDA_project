/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.controller.SurveillanceCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.surveillance.SurveillanceComboAbstractStore',
        'Admin.store.surveillance.SurveillanceGridAbstractStore',
        'Admin.store.surveillance.FoodSurveillanceStr',
        'Admin.store.surveillance.DrugsSurveillanceStr',
        'Admin.store.surveillance.CosmeticsSurveillanceStr',
        'Admin.store.surveillance.MedDevicesSurveillanceStr'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'pirsampledetailstabpanel',//onPmsPlanSelectionListDblClick
            selector: '#pirsampledetailstabpanel'
        }, {
            ref: 'samplecollectionsitefrm',//onPmsPlanSelectionListDblClick
            selector: 'samplecollectionsitefrm'
        }],
        
        control: {
            'foodsurveillancetb button[name=foodSurveillanceHomeBtn]': {
                click: 'foodPmsHome'
            },
            'drugssurveillancetb button[name=drugsSurveillanceHomeBtn]': {
                click: 'drugsPmsHome'
            },
            'cosmeticssurveillancetb button[name=cosmeticsSurveillanceHomeBtn]': {
                click: 'cosmeticsPmsHome'
            },
            'meddevicessurveillancetb button[name=meddevicesSurveillanceHomeBtn]': {
                click: 'medDevicesPmsHome'
            },

            'applicationpmsprogramdetailsfrm button[action=link_pms_program]': {
                click: 'showPmsProgramsSelectionList'
            },
            'applicationpmsplandetailsfrm button[action=link_pms_plan]': {
                click: 'showPmsPlansSelectionList'
            },
            'applicationpmsplandetailsfrm button[name=link_pms_plan]': {
                click: 'showPmsPlansSelectionList'
            },
            'pirsampledetailstabpanel button[action=link_pms_plan]': {
                click: 'showPmsPlansAppSelectionList'
            },
            'pmsprogramsselectiongrid': {
                itemdblclick: 'onPmsProgramSelectionListDblClick'
            },
            'pmsprogramsappselectiongrid': {
                itemdblclick: 'onPmsApplicationProgramSelectionListDblClick'
            },
            
            'pmsplansselectiongrid': {
                itemdblclick: 'onPmsPlanSelectionListDblClick'
            },


            'sampleselectiongrid': {
                itemdblclick: 'onSampleSelectionListDblClick'
            },
            'sampledetailsgrid button[action=add]': {
                click: 'showAddSampleWindow'
            },'samplenonstructuredetailsgrid button[action=add]': {
                click: 'showAddSampleWindow'
            },

            
            //STRUCTURED
            'structuredpmsreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClick'
            },
            'structuredpmsreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClick'
            },
            'structuredpmsreceivingwizard button[action=quickNav]': {
                click: 'quickNavigation'
            },
            'pirsampledetailstabpanel button[action=quickNav]': {
                click: 'quickNavigationSample'
            },
            //pir products tab
            'pirsampledetailstabpanel button[name=next_btn]': {
                click: 'onNextCardClickSample'
            },
            'pirsampledetailstabpanel button[name=prev_btn]': {
                click: 'onPrevCardClickSample'
            },
            //NON STRUCTURED
            'unstructuredpmsreceivingwizard button[name=next_btn]': {
                click: 'onNextCardClickUnstructured'
            },
            'unstructuredpmsreceivingwizard button[name=prev_btn]': {
                click: 'onPrevCardClickUnstructured'
            },
            'unstructuredpmsreceivingwizard button[action=quickNav]': {
                click: 'quickNavigationUnstructured'
            },
            //
            'samplecollectionsitefrm button[action=search_premise]': {
                click: 'showSampleCollectionSiteSelectionList'
            },
            'sampledetailsfrm button[action=search_sample]': {
                click: 'showSamplesSelectionList'
            },
            'collectionsiteselectiongrid': {
                itemdblclick: 'onCollectionSiteSelectionListDblClick'
            },
            //prepare main interfaces
            //STRUCTURED
            'structuredpmsreceiving': {
                afterrender: 'prepareStructuredPmsReceiving'
            },'structuredpmsevaluation': {
                afterrender: 'prepareStructuredPmsEvaluation'
            },
            'structuredmanagerscreeningevaluation': {
                afterrender: 'prepareStructuredPmsEvaluation'
            },
            'structuredpmslabscreening': {
                afterrender: 'prepareStructuredPmsEvaluation'
            },
            'structuredpmstechnicalmeeting': {
                afterrender: 'prepareStructuredPmsTCMeeting'
            },
            'structuredpmstcrecommendation': {
                afterrender: 'prepareStructuredPmsTCMeeting'
            },
            'structuredpmslabanalysis': {
                afterrender: 'prepareStructuredPmsEvaluation'
            },
            'structuredpmsapprovals': {
                afterrender: 'prepareStructuredPmsEvaluation'
            },
            //NOT STRUCTURED
            'unstructuredpmsreceiving': {
                afterrender: 'prepareUnstructuredPmsReceiving'
            },
            'unstructuredpmsevaluation': {
                afterrender: 'prepareUnstructuredPmsEvaluation'
            },
            'unstructuredpmslabscreening': {
                afterrender: 'prepareUnstructuredPmsEvaluation'
            },
            'unstructuredpmstechnicalmeeting': {
                afterrender: 'prepareStructuredPmsTCMeeting'
            },
            'unstructuredpmstcrecommendation': {
                afterrender: 'prepareStructuredPmsTCMeeting'
            },
            'unstructuredpmslabanalysis': {
                afterrender: 'prepareUnstructuredPmsEvaluation'
            },
            'unstructuredpmsapprovals': {
                afterrender: 'prepareUnstructuredPmsEvaluation'
            },
            //
            'structuredpmsreceivingwizard button[name=save_btn]': {
                click: 'saveStructuredPmsReceivingBaseDetails'
            },
            'pmsappmoredetailswizard button[name=save_edition_btn]': {
                click: 'saveStructuredPmsEdittingBaseDetails'
            },
            'sampledetailsfrm button[name=save_btn]': {
                click: 'saveSurveillanceSampleDetails'
            },
            'unstructuredpmsreceivingwizard button[name=save_btn]': {
                click: 'saveUnstructuredPmsReceivingBaseDetails'
            },
            //Submission Structured
            'structuredpmsreceivingwizard  button[name=process_submission_btn]': {
                click: 'showStructuredReceivingApplicationSubmissionWin'
            },
            'structuredpmsevaluationwizard button[name=process_submission_btn]': {
                click: 'showStructuredPIRApplicationSubmissionWin'
            },
            'structuredmanagerscreeningevaluationwizard button[name=process_submission_btn]': {
                click: 'showStructuredPIRApplicationSubmissionWin'
            },
            
            'structuredpmslabscreeningwizard  button[name=process_submission_btn]': {
                click: 'showStructuredScreeningApplicationSubmissionWin'
            },
            'structuredpmslabanalysiswizard  button[name=process_submission_btn]': {
                click: 'showStructuredAnalysisApplicationSubmissionWin'
            },
            'tmeetingsampledetailsgrid button[action=process_submission_btn]': {
                click: 'showStructuredTCMeetingApplicationSubmissionWin'
            },
            'tcrecommendationsampledetailsgrid button[action=process_submission_btn]': {
                click: 'showStructuredTCRecommendationApplicationSubmissionWin'
            },
            'structuredpmsapprovalswizard button[name=process_submission_btn]': {
                click: 'showStructuredApprovalApplicationSubmissionWin'
            },
            //Submission Non Structured
            'unstructuredpmsreceivingwizard  button[name=process_submission_btn]': {
                click: 'showUnstructuredReceivingApplicationSubmissionWin'
            },
            'unstructuredpmsevaluationwizard button[name=process_submission_btn]': {
                click: 'showStructuredPIRApplicationSubmissionWin'
            },
            'unstructuredpmslabscreeningwizard  button[name=process_submission_btn]': {
                click: 'showStructuredScreeningApplicationSubmissionWin'
            },
            'unstructuredpmslabanalysiswizard  button[name=process_submission_btn]': {
                click: 'showStructuredAnalysisApplicationSubmissionWin'
            },
            /* 'tmeetingsampledetailsgrid button[action=process_submission_btn]': {
                 click: 'showStructuredTCMeetingApplicationSubmissionWin'
             },
             'tcrecommendationsampledetailsgrid button[action=process_submission_btn]': {
                 click: 'showStructuredTCRecommendationApplicationSubmissionWin'
             },*/
            'unstructuredpmsapprovalswizard button[name=process_submission_btn]': {
                click: 'showStructuredApprovalApplicationSubmissionWin'
            },
            //
            'pmspirevaluationgrid combo[name=applicable_checklist]': {
                afterrender: 'loadEvaluationApplicableChecklist'
            },
            'pmssampleingredientsgrid button[action=add]': {
                click: 'showAddSampleIngredientsWin'
            },
            'pmssampleingredientsgrid': {
                editRecord: 'showEditSampleIngredientsWin'
            },
            'evaluationsampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            }, 'structuredmanagerscreeningsamplegrid': {
                refresh: 'refreshSamplesGrid'
            },
            'screeningsampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            },
            'analysissampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            },
            'approvalssampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            },
            'tmeetingsampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            },
            'tcrecommendationsampledetailsgrid': {
                refresh: 'refreshSamplesGrid'
            },
            'structuredpmstmeetingpnl button[name=save_btn]': {
                click: 'savePmsTCMeetingDetails'
            },
            'unstructuredpmstmeetingpnl button[name=save_btn]': {
                click: 'savePmsTCMeetingDetails'
            },
            'tmeetingsampledetailsgrid button[name=more_app_details]': {
                click: 'showSurveillanceApplicationMoreDetails'
            },
            'tcrecommendationsampledetailsgrid button[name=more_app_details]': {
                click: 'showSurveillanceApplicationMoreDetails'
            },
            'pmsprogramgrid button[action=add]': {
                click: 'showAddPmsProgram'
            },
            'applicationpmsplandetailsfrm combo[name=region_id]': {
                change: 'onChangePmsPlanRegionDetails'
            },
            'applicationpmsplandetailsfrm combo[name=district_id]': {
                change: 'onChangePmsPlanDistrictDetails'
            },
            'programimplementationdetailsgrid combo[name=pms_program_id]':{
                afterrender: 'onRenderProgramImplDetailGrid'
            },
            'groupsampleanalysisgrid button[action=addsamplebatchapplication]':{
                click: 'funcaddsamplebatchapplication'
            },
            'groupsampleanalysisdetailspnl button[name=samplegroupreturn]':{
                click: 'funcReturntosamplebatchapplication'
            }
            
            
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                setSurveillanceGridsStore: 'setSurveillanceGridsStore',
                setSurveillanceCombosStore: 'setSurveillanceCombosStore',
                newPmsApplication: 'onNewPmsApplication',
                pmsApplicationMoreDetails: 'showSurveillanceApplicationMoreDetailsGeneric',
                pmsApplicationMoreDetailsUnstructured: 'showSurveillanceApplicationMoreDetailsUnstructured'
            }
        }
    },
    funcaddsamplebatchapplication:function(btn){
        var store = 
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            groupsampleanalysispnl = activeTab.down('#groupsampleanalysispnl');
        
            groupsampleanalysispnl.removeAll();

            groupsampleanalysispnl.add({xtype:'groupsampleanalysisdetailspnl',title:'Batch Sample Analysis Request'});

    },
    funcReturntosamplebatchapplication:function(btn){
        var store = 
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            groupsampleanalysispnl = activeTab.down('#groupsampleanalysispnl');
        
            groupsampleanalysispnl.removeAll();
            groupsampleanalysispnl.add({xtype:'groupsampleanalysisgrid'});

    },
    
    onRenderProgramImplDetailGrid:function(cbo){
        var store = cbo.getStore(),
            grid = cbo.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

        store.removeAll();
        store.load({params: {section_id:section_id}});
        
    },
    onChangePmsPlanRegionDetails:function(cmb,newVal){
        var form = cmb.up('form'),
            districtStore = form.down('combo[name=district_id]').getStore(),
            filterObj = {region_id: newVal},
            filterStr = JSON.stringify(filterObj);
        districtStore.removeAll();
        districtStore.load({params: {filter: filterStr}});
        var samplecollectionsitefrm = this.getSamplecollectionsitefrm();

            samplecollectionsitefrm.down('combo[name=region_id]').setValue(newVal);
            
            samplecollectionsitefrm.down('combo[name=region_id]').setReadOnly(true);
    },
    onChangePmsPlanDistrictDetails:function(cmb,newVal){
        var samplecollectionsitefrm = this.getSamplecollectionsitefrm();
            samplecollectionsitefrm.down('combo[name=district_id]').setValue(newVal);

            samplecollectionsitefrm.down('combo[name=district_id]').setReadOnly(true);

    },
    setSurveillanceGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.surveillance.SurveillanceGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setSurveillanceCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.surveillance.SurveillanceComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    loadEvaluationApplicableChecklist: function (cmbo) {
        var me = this,
            store = cmbo.getStore(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        store.removeAll();
        store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
    },

    refreshSamplesGrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            recommendation_id = (grid.down('combo[name=decision_id]')) ? grid.down('combo[name=decision_id]').getValue() : '',
            analysis_type_id = me.analysis_type_id,
            stage_id = me.stage_id;
        store.getProxy().extraParams = {
            application_id: application_id,
            analysis_type_id: analysis_type_id,
            stage_id: stage_id,
            recommendation_id: recommendation_id
        };
    },

    onNewPmsApplication: function (sub_module_id, wrapper_xtype) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down(wrapper_xtype),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);
        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    foodPmsHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('foodsurveillancedashwrapper');
        if (!dashboardWrapper.down('foodsurveillancedash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'foodsurveillancedash'});
        }
    },

    drugsPmsHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('drugssurveillancedashwrapper');
        if (!dashboardWrapper.down('drugssurveillancedash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'drugssurveillancedash'});
        }
    },

    cosmeticsPmsHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('cosmeticssurveillancedashwrapper');
        if (!dashboardWrapper.down('cosmeticssurveillancedash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'cosmeticssurveillancedash'});
        }
    },

    medDevicesPmsHome: function () {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('meddevicessurveillancedashwrapper');
        if (!dashboardWrapper.down('meddevicessurveillancedash')) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: 'meddevicessurveillancedash'});
        }
    },

    showPmsProgramsSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    showPmsPlansAppSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            if(activeTab.down('hiddenfield[name=program_implementation_id]')){
              var  program_id = activeTab.down('hiddenfield[name=program_id]').getValue(),
                    program_implementation_id= activeTab.down('hiddenfield[name=program_implementation_id]').getValue();
                    
            }else{
                var planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
                    program_id = planProgramForm.down('hiddenfield[name=program_id]').getValue(),
                    program_implementation_id= planProgramForm.down('hiddenfield[name=program_implementation_id]').getValue();
            }
            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
                dosageFormCol = childObject.getColumnManager().getHeaderByDataIndex('dosage_form'),
                productFormCol = childObject.getColumnManager().getHeaderByDataIndex('product_form'),
                deviceTypeCol = childObject.getColumnManager().getHeaderByDataIndex('device_type');
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('combo[name=pms_program_id]').setValue(program_id);
        childObject.down('hiddenfield[name=program_implementation_id]').setValue(program_implementation_id);
        
        
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    showPmsPlansSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            childObject = Ext.widget(childXtype),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();
            if(activeTab.down('applicationpmsplandetailsfrm')){
               var program_id = activeTab.down('hiddenfield[name=program_id]');
               console.log('used normal loop');
            }else{
                var planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
                    program_id = planProgramForm.down('hiddenfield[name=program_id]').getValue();
                    console.log('reached the second loop for pms');
            }
           
            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),

            
            dosageFormCol = childObject.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = childObject.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = childObject.getColumnManager().getHeaderByDataIndex('device_type');
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },
    
    onPmsApplicationProgramSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            pms_program_id = record.get('pms_program_id'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab();//applicationpmsplandetailsfrm
            if(activeTab.down('applicationpmsplandetailsfrm')){
               var planProgramForm = activeTab.down('applicationpmsplandetailsfrm');
               console.log('ddnt reach save btn renaming');
            }else{
                var planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
                    wizard = planProgramForm.up('panel'),
                    wizard_pnl = wizard.up('panel');
                    console.log('reached save btn renaming');
                 wizard_pnl.down('button[action=edit_locator]').name = 'save_edition_btn';
            }
            
          //  productsStr = planProgramForm.down('combo[name=product_id]').getStore(),
           var regionsStr = planProgramForm.down('combo[name=region_id]').getStore(),
            SampleingSiteStr = planProgramForm.down('combo[name=sampling_site_id]').getStore(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
        
        regionsStr.removeAll();
        regionsStr.load({params: {program_id: pms_program_id}});
        
        SampleingSiteStr.load({params: {program_id: pms_program_id}});
        
        mask.show();
        planProgramForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    onPmsProgramSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            pms_program_id = record.get('pms_program_id'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),//applicationpmsplandetailsfrm
            pmsProgramForm = activeTab.down('applicationpmsprogramdetailsfrm'),
            planProgramForm = activeTab.down('applicationpmsplandetailsfrm'),
            productsStr = planProgramForm.down('combo[name=product_id]').getStore(),
            regionsStr = planProgramForm.down('combo[name=region_id]').getStore(),
            SampleingSiteStr = planProgramForm.down('combo[name=sampling_site_id]').getStore(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
           
        productsStr.removeAll();
        productsStr.load({params: {program_id: pms_program_id}});
        regionsStr.removeAll();
        regionsStr.load({params: {program_id: pms_program_id}});
        
        SampleingSiteStr.load({params: {program_id: pms_program_id}});
        
        mask.show();
        planProgramForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    onPmsPlanSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            pms_program_id = record.get('program_id'),
            productTab = me.getPirsampledetailstabpanel(),
            planProgramForm = productTab.down('#pmsprogramplan'),
            productsStr = planProgramForm.down('combo[name=product_id]').getStore(),
           // regionsStr = planProgramForm.down('combo[name=region_id]').getStore(),
            mask = new Ext.LoadMask({
                msg: 'Please wait...',
                target: win
            });
            productsStr.removeAll();
            productsStr.load({params: {program_id: pms_program_id}});
            //regionsStr.removeAll();
           // regionsStr.load({params: {program_id: pms_program_id}});
            mask.show();
            planProgramForm.loadRecord(record);
            Ext.Function.defer(function () {
                mask.hide();
                win.close();
            }, 200);
    },

    onSampleSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            anotherWin,
            form;
        win.close();
        anotherWin = Ext.WindowManager.getActive();
        if (anotherWin) {
            form = anotherWin.down('#sampledetailsfrm');
            form.loadRecord(record);
        }
    },
    
    onPrevCardClickSample: function (btn) {
        var wizardPnl = btn.up('#pirsampledetailstabpanel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    //STRUCTURED...Receiving
    onPrevCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('structuredpmsreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('structuredpmsreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    
    onNextCardClickSample: function (btn) {
        var wizardPnl = btn.up('#pirsampledetailstabpanel');
        pms_plan_id = wizardPnl.down('hiddenfield[name=pms_plan_id]').getValue();
            wizardPnl.getViewModel().set('atBeginning', false);
            layout = wizardPnl.getLayout();

nextStep = wizardPnl.items.indexOf(layout.getNext());
        if (nextStep > 0) {
            
            if (!pms_plan_id) {
                toastr.warning('Please select the PMS Program Plan Implementation Details!!', 'Warning Response');
                return false;
            }
        }
        this.navigate(btn, wizardPnl, 'next');
    },
    navigate: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 1 && (direction == 'next' || direction === 'next')) {
            
            if (!application_id) {
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 2) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },
    quickNavigationSample: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('#pirsampledetailstabpanel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
       
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            // wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        
        if (step == 1) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    quickNavigation: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('structuredpmsreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 1) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            // wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 2) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    //NOT STRUCTURED...Receiving
    onPrevCardClickUnstructured: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('unstructuredpmsreceivingwizard');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateUnstructured(btn, wizardPnl, 'prev');
    },

    onNextCardClickUnstructured: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('unstructuredpmsreceivingwizard');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateUnstructured(btn, wizardPnl, 'next');
    },

    navigateUnstructured: function (button, wizardPanel, direction) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            layout = wizardPanel.getLayout(),
            progress = wizardPanel.down('#progress_tbar'), //this.lookupReference('progress'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
        if (nextStep > 0 && (direction == 'next' || direction === 'next')) {
            if (!application_id) {
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex > 1) {
            wizardPanel.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPanel.down('button[name=save_btn]').setVisible(true);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },

    quickNavigationUnstructured: function (btn) {
        var step = btn.step,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            wizardPnl = activeTab.down('unstructuredpmsreceivingwizard'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step > 0) {
            var thisItem = progressItems[step];
            if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }
        }
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            // wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step > 1) {
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        } else {
            wizardPnl.down('button[name=save_btn]').setVisible(true);
        }
        if (step == 3) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    //PREPARE
    //Structured
    prepareStructuredPmsReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm'),
            pmsPlanFrm = activeTab.down('applicationpmsplandetailsfrm'),
            samplesGrid = activeTab.down('sampledetailsabstractgrid'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
           // productsStr = pmsPlanFrm.down('combo[name=product_id]').getStore(),
            regionsStr = pmsPlanFrm.down('combo[name=region_id]').getStore(),
            samplingSiteStr = pmsPlanFrm.down('combo[name=sampling_site_id]').getStore(),

            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
      //  productsStr.removeAll();
        regionsStr.removeAll();
        sampleSiteFrm.down('button[action=search_premise]').setDisabled(false);
       /* if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            pmsPlanFrm.down('combo[name=product_form_id]').setHidden(false);
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            pmsPlanFrm.down('combo[name=device_type_id]').setHidden(false);
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            pmsPlanFrm.down('combo[name=dosage_form_id]').setHidden(false);
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        */
        if (application_id) {
            zone_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'surveillance/prepareStructuredPmsReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        mainResults = resp.mainResults,
                        pmsResults = resp.pmsResults,
                        sampleSiteResults = resp.sampleSiteResults;
                    if (success == true || success === true) {
                        if (mainResults) {
                            zone_fld.setValue(mainResults.zone_id);
                            directorate_fld.setValue(mainResults.directorate_id);
                        }
                        if (pmsResults) {
                            var model = Ext.create('Ext.data.Model', pmsResults);
                            pmsPlanFrm.loadRecord(model);
                           // productsStr.load({params: {program_id: pmsResults.pms_program_id}});
                            regionsStr.load({params: {program_id: pmsResults.pms_program_id}});
                            
                            samplingSiteStr.load({params: {program_id: pmsResults.pms_program_id}});
                        }
                        if (sampleSiteResults) {
                            var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                            sampleSiteFrm.loadRecord(model2);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }//productsStr 
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareStructuredPmsEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm'),
            pmsPlanFrm = activeTab.down('applicationpmsplandetailsfrm'),
            samplesGrid = activeTab.down('sampledetailsabstractgrid'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
           // productsStr = pmsPlanFrm.down('combo[name=product_id]').getStore(),
            regionsStr = pmsPlanFrm.down('combo[name=region_id]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
       // productsStr.removeAll();
        regionsStr.removeAll();
       /* sampleSiteFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        */
        zone_fld.setReadOnly(true);
        directorate_fld.setReadOnly(true);
        sampleSiteFrm.down('button[action=search_premise]').setDisabled(true);
        pmsPlanFrm.down('button[name=link_pms_plan]').setDisabled(true);
       // pmsPlanFrm.down('button[action=link_pms_plan]').setDisabled(true);
       /*
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            pmsPlanFrm.down('combo[name=product_form_id]').setHidden(false);
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            pmsPlanFrm.down('combo[name=device_type_id]').setHidden(false);
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            pmsPlanFrm.down('combo[name=dosage_form_id]').setHidden(false);
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        */
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'surveillance/prepareStructuredPmsReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        mainResults = resp.mainResults,
                        pmsResults = resp.pmsResults,
                        sampleSiteResults = resp.sampleSiteResults;
                    if (success == true || success === true) {
                        if (mainResults) {
                            zone_fld.setValue(mainResults.zone_id);
                            directorate_fld.setValue(mainResults.directorate_id);
                        }
                        if (pmsResults) {
                            var model = Ext.create('Ext.data.Model', pmsResults);
                            pmsPlanFrm.loadRecord(model);
                          //  productsStr.load({params: {program_id: pmsResults.pms_program_id}});
                            regionsStr.load({params: {program_id: pmsResults.pms_program_id}});
                        }
                        if (sampleSiteResults) {
                            var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                            sampleSiteFrm.loadRecord(model2);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareStructuredPmsTCMeeting: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            meetingDetailsFrm = activeTab.down('form'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            meetingParticipantsGrid = activeTab.down('grid[name=meetingParticipantsGrid]');
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'surveillance/prepareStructuredPmsTCMeetingStage',
                params: {
                    application_id: application_id,
                    application_code: application_code,
                    table_name: 'tra_surveillance_applications'
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results;
                    if (success == true || success === true) {
                        if (results) {
                            var model = Ext.create('Ext.data.Model', results);
                            meetingDetailsFrm.loadRecord(model);
                            meetingParticipantsGrid.getStore().load();
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    //Non Structured
    prepareUnstructuredPmsReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm'),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm'),
            samplesGrid = activeTab.down('sampledetailsabstractgrid'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
        sampleSiteFrm.down('button[action=search_premise]').setDisabled(false);
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        if (application_id) {
            zone_fld.setReadOnly(true);
            Ext.Ajax.request({
                method: 'GET',
                url: 'surveillance/prepareStructuredPmsReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        mainResults = resp.mainResults,
                        pmsResults = resp.pmsResults,
                        sampleSiteResults = resp.sampleSiteResults;
                    if (success == true || success === true) {
                        if (mainResults) {
                            zone_fld.setValue(mainResults.zone_id);
                            directorate_fld.setValue(mainResults.directorate_id);
                        }
                        if (pmsResults) {
                        }
                        if (sampleSiteResults) {
                            var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                            sampleSiteFrm.loadRecord(model2);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },

    prepareUnstructuredPmsEvaluation: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm'),
            samplesGrid = activeTab.down('sampledetailsabstractgrid'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});
        sampleSiteFrm.getForm().getFields().each(function (field) {
            field.setReadOnly(true);
        });
        zone_fld.setReadOnly(true);
        directorate_fld.setReadOnly(true);
        sampleSiteFrm.down('button[action=search_premise]').setDisabled(true);
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'surveillance/prepareStructuredPmsReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        mainResults = resp.mainResults,
                        pmsResults = resp.pmsResults,
                        sampleSiteResults = resp.sampleSiteResults;
                    if (success == true || success === true) {
                        if (mainResults) {
                            zone_fld.setValue(mainResults.zone_id);
                            directorate_fld.setValue(mainResults.directorate_id);
                        }
                        if (pmsResults) {
                        }
                        if (sampleSiteResults) {
                            var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                            sampleSiteFrm.loadRecord(model2);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
   
    showAddSampleWindow: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
           
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            childObject = Ext.widget(childXtype),
            sampleDetailsFrm = childObject.down('form');
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            sampleDetailsFrm.down('combo[name=product_form_id]').setHidden(false);
           // sampleDetailsFrm.down('textfield[name=common_name]').setHidden(false);
        } else if (section_id == 4 || section_id === 4) {//medical devices
            sampleDetailsFrm.down('combo[name=device_type_id]').setHidden(false);
        } else {
            sampleDetailsFrm.down('combo[name=dosage_form_id]').setHidden(false);
           // childObject.items.getAt(1).tab.setHidden(false);
        }
        
        if(application_id == ''){
            toastr.warning('Save PMS application!!', 'Warning Response');
            return;
        }
        childObject.down('button[action=save_form_data]').storeID = btn.storeID;
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        childObject.down('hiddenfield[name=application_id]').setValue(application_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showSampleCollectionSiteSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            program_implementation_id = '',
            activeTab = mainTabPanel.getActiveTab();
            
            if(activeTab.down('combo[name=region_id]')){
                var region_id = activeTab.down('combo[name=region_id]').getValue();
            }else{
                var planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
                region_id = planProgramForm.down('combo[name=region_id]').getValue();
            }
            var section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            if(activeTab.down('hiddenfield[name=program_implementation_id]')){
                program_implementation_id = activeTab.down('hiddenfield[name=program_implementation_id]').getValue();
            }else{
                if(planProgramForm.down('hiddenfield[name=program_implementation_id]')){
                    program_implementation_id = planProgramForm.down('hiddenfield[name=program_implementation_id]').getValue();

                }
                else{
                    program_implementation_id =0;
                }
               
            }
            if(program_implementation_id != ''){
                
                if(region_id != ''){
                    var childObject = Ext.widget(childXtype);
                
                    childObject.down('hiddenfield[name=section_id]').setValue(section_id);
    
                    childObject.down('hiddenfield[name=region_id]').setValue(region_id);
                   
                    funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');

                }
                else{
                    toastr.warning('Please select Sampling region!!', 'Warning Response');
                      return false;
                }
                
            }
            else if(program_implementation_id == 0){

                var childObject = Ext.widget(childXtype);
                    childObject.down('hiddenfield[name=section_id]').setValue(section_id);
                    childObject.down('hiddenfield[name=region_id]').setValue(region_id);
                    funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
            }
            else{
                toastr.warning('Please select PMS program Implementation Plan!!', 'Warning Response');
                return false;
            }
        
    },

    showSamplesSelectionList: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        var childObject = Ext.widget(childXtype);
        childObject.down('hiddenfield[name=section_id]').setValue(section_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    onCollectionSiteSelectionListDblClick: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            collectionSiteForm = activeTab.down('samplecollectionsitefrm');
        mask = new Ext.LoadMask({
            msg: 'Please wait...',
            target: win
        });
        mask.show();
        collectionSiteForm.loadRecord(record);
        Ext.Function.defer(function () {
            mask.hide();
            win.close();
        }, 200);
    },

    saveStructuredPmsReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            district_id = activeTab.down('combo[name=district_id]').getValue(),
            region_id = activeTab.down('combo[name=directorate_id]').getValue(),
            sampling_site_id = activeTab.down('combo[name=sampling_site_id]').getValue(),
            program_id = activeTab.down('hiddenfield[name=program_id]').getValue(),
            program_implementation_id = activeTab.down('hiddenfield[name=program_implementation_id]').getValue(),
            
            
            //'','',,
            zone_id = zone_fld.getValue(),
            directorate_id = directorate_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            collectionSiteForm = activeTab.down('samplecollectionsitefrm'),
            collectionSiteFrm = collectionSiteForm.getForm();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!directorate_id) {
            toastr.warning('Please select directorate!!', 'Warning Response');
            return false;
        }
       
        if (collectionSiteFrm.isValid()) {
            collectionSiteFrm.submit({
                url: 'surveillance/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    directorate_id: directorate_id,
                    district_id:district_id,
                    region_id:region_id,
                    sampling_site_id:sampling_site_id,
                    program_id:program_id,
                    program_implementation_id:program_implementation_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        sample_site_id = resp.sample_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            zone_fld.setReadOnly(true);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            collectionSiteForm.down('hiddenfield[name=sample_site_id]').setValue(sample_site_id);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields(Sample Collection Site)!!', 'Warning Response');
            return false;
        }
    },
saveStructuredPmsEdittingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            planProgramForm = Ext.ComponentQuery.query("#applicationpmsplandetailsfrmRefID")[0],
            wizard = planProgramForm.up('panel'),
            wizard_pnl = wizard.up('panel'),
            zone_fld = wizard_pnl.down('combo[name=zone_id]'),
            directorate_fld = wizard_pnl.down('combo[name=directorate_id]'),
            district_id = wizard_pnl.down('combo[name=district_id]').getValue(),
            region_id = wizard_pnl.down('combo[name=directorate_id]').getValue(),
            sampling_site_id = wizard_pnl.down('combo[name=sampling_site_id]').getValue(),
            program_id = wizard_pnl.down('hiddenfield[name=program_id]').getValue(),
            program_implementation_id = wizard_pnl.down('hiddenfield[name=program_implementation_id]').getValue(),
            
            
            //'','',,
            zone_id = zone_fld.getValue(),
            directorate_id = directorate_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            collectionSiteForm = wizard_pnl.down('samplecollectionsitefrm'),
            collectionSiteFrm = collectionSiteForm.getForm();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!directorate_id) {
            toastr.warning('Please select directorate!!', 'Warning Response');
            return false;
        }
       
        if (collectionSiteFrm.isValid()) {
            collectionSiteFrm.submit({
                url: 'surveillance/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    directorate_id: directorate_id,
                    district_id:district_id,
                    region_id:region_id,
                    sampling_site_id:sampling_site_id,
                    program_id:program_id,
                    program_implementation_id:program_implementation_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        sample_site_id = resp.sample_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields(Sample Collection Site)!!', 'Warning Response');
            return false;
        }
    },
    saveUnstructuredPmsReceivingBaseDetails: function (btn) {
        var me = this,
            toaster = btn.toaster,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_fld = activeTab.down('combo[name=zone_id]'),
            directorate_fld = activeTab.down('combo[name=directorate_id]'),
            zone_id = zone_fld.getValue(),
            directorate_id = directorate_fld.getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            collectionSiteForm = activeTab.down('samplecollectionsitefrm'),
            collectionSiteFrm = collectionSiteForm.getForm();
        if (!zone_id) {
            toastr.warning('Please select zone!!', 'Warning Response');
            return false;
        }
        if (!directorate_id) {
            toastr.warning('Please select directorate!!', 'Warning Response');
            return false;
        }
        if (collectionSiteFrm.isValid()) {
            collectionSiteFrm.submit({
                url: 'surveillance/saveNewReceivingBaseDetails',
                waitMsg: 'Please wait...',
                async: false,
                params: {
                    process_id: process_id,
                    workflow_stage_id: workflow_stage_id,
                    application_id: application_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    zone_id: zone_id,
                    directorate_id: directorate_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        record_id = resp.record_id,
                        ref_no = resp.reference_no,
                        application_code = resp.application_code,
                        sample_site_id = resp.sample_site_id;
                    if (success == true || success === true) {
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                            zone_fld.setReadOnly(true);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                            collectionSiteForm.down('hiddenfield[name=sample_site_id]').setValue(sample_site_id);
                            activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                        }
                    } else {
                        toastr.error(message, "Failure Response");
                        closeActiveWindow();
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                    closeActiveWindow();
                }
            });
        } else {
            toastr.warning('Please fill all the required fields(Sample Collection Site)!!', 'Warning Response');
            return false;
        }
    },

    saveSurveillanceSampleDetails: function (btn) {
        var me = this,
            form = btn.up('form'),
            tabpanel = form.up('#pirsampledetailstabpanel'),
           
            frm = form.getForm(),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);
            pms_plan_id= 0;
            if(tabpanel.down('#pmsprogramplan')){
                var  pmsprogramplan = tabpanel.down('#pmsprogramplan'),
                 pms_plan_id = pmsprogramplan.down('hiddenfield[name=pms_plan_id]').getValue();
                 if(pms_plan_id < 1){

                    toastr.error('Select Program Plan to proceed!!', "Failure Response");
                    return;
                }
            }
           
        if (frm.isValid()) {
            frm.submit({
                url: 'surveillance/saveSurveillanceSampleDetails',
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params:{
                    pms_plan_id:pms_plan_id
                },
                success: function (frm, action) {
                    var resp = action.result,
                        message = resp.message,
                        success = resp.success,
                        sample_id = resp.record_id;
                    if (success == true || success === true) {
                        store.load();
                        toastr.success(message, "Success Response");
                        form.down('hiddenfield[name=sample_id]').setValue(sample_id);
                        //win.close();
                        tabpanel.setActiveTab(1);
                    } else {
                        toastr.error(message, "Failure Response");
                    }
                },
                failure: function (frm, action) {
                    var resp = action.result,
                        message = resp.message;
                    toastr.error(message, "Failure Response");
                }
            });
        } else {
            toastr.warning('Please fill all the required fields!!', 'Warning Response');
        }
    },

    //Structured
    showStructuredReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = this.validateStructuredPmsReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateStructuredPmsReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            program_id = activeTab.down('hiddenfield[name=program_id]').getValue(),
            pms_sample_gridStr = activeTab.down('sampledetailsgrid').getStore(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm');
        if (!program_id) {
            toastr.warning('Please Select PMS program details!!', 'Warning Response');
            return false;
        }
        if (!sampleSiteFrm.isValid()) {
            toastr.warning('Please Enter All the required sample collection site Details!!', 'Warning Response');
            return false;
        }
        if(pms_sample_gridStr){
            if(pms_sample_gridStr.getCount()==0){
                toastr.warning('Please add atleast one sample detail', 'Warning Response');
                return false;
            }
        }else{
            toastr.warning('Please add atleast one sample detail', 'Warning Response');
            return false;
        }

        this.saveStructuredPmsReceivingBaseDetails(btn);
        return true;
    },

    showStructuredScreeningApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            analysis_type = 2,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showPmsSamplesWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionspmssamplesfrm', winWidth, storeID, analysis_type, '', 0, stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showStructuredTCMeetingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('tmeetingsampledetailsgrid'),
            recommendation_id = grid.down('combo[name=decision_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            analysis_type = 3,
            valid = this.validatePmsTMeetingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        /* if (!recommendation_id) {
             Ext.getBody().unmask();
             toastr.warning('No Recommendation Selected!!', 'Warning Response');
             return false;
         }*/
        if (grid.getStore().getTotalCount() < 1) {
            Ext.getBody().unmask();
            toastr.warning('Nothing to submit!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            if(table_name == 'tra_surveillance_applications'){
                var wkf_stage_id = activeTab.down('hiddenfield[name=initialStageId]').getValue();
                  showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID, 0, '', '',stage_id);
            }else{
                  showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);  
            }
        } else {
            Ext.getBody().unmask();
        }
    },

    validatePmsTMeetingSubmission: function (btn) {
        var valid = this.savePmsTCMeetingDetails(btn);
        if (valid == false || valid === false) {
            return false;
        }
        return true;
    },

    showStructuredTCRecommendationApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('tcrecommendationsampledetailsgrid'),
            recommendation_id = grid.down('combo[name=decision_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            analysis_type = 3,
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (!recommendation_id) {
            Ext.getBody().unmask();
            toastr.warning('No Recommendation Selected!!', 'Warning Response');
            return false;
        }
        if (grid.getStore().getTotalCount() < 1) {
            Ext.getBody().unmask();
            toastr.warning('Nothing to submit!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showPmsSamplesWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionspmssamplesfrm', winWidth, storeID, analysis_type, recommendation_id, 1, stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showStructuredAnalysisApplicationSubmissionWin: function (btn) {//conformatory
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            valid = true,
            analysis_type = 4,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showPmsSamplesWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionspmssamplesfrm', winWidth, storeID, analysis_type, '', 0, stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showStructuredPIRApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            grid = activeTab.down('#evaluationsampledetailsgrid'),
            recommendation_id = grid.down('combo[name=decision_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            analysis_type = activeTab.down('hiddenfield[name=analysis_type]').getValue(),
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (!recommendation_id) {
            Ext.getBody().unmask();
            toastr.warning('No Recommendation Selected!!', 'Warning Response');
            return false;
        }
        if (grid.getStore().getTotalCount() < 1) {
            Ext.getBody().unmask();
            toastr.warning('Nothing to submit!!', 'Warning Response');
            return false;
        }
        if (valid == true || valid === true) {
            showPmsSamplesWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionspmssamplesfrm', winWidth, storeID, analysis_type, recommendation_id, 1, stage_id);
        } else {
            Ext.getBody().unmask();
        }
    },

    showStructuredApprovalApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            analysis_type = 1,
            valid = true,
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },
    //Non Structured
    showUnstructuredReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            valid = true, // this.validateUnstructuredPmsReceivingSubmission(btn),
            storeID = getApplicationStore(module_id, section_id),
            table_name = getApplicationTable(module_id);
        if (valid == true || valid === true) {
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID);
        } else {
            Ext.getBody().unmask();
        }
    },

    validateUnstructuredPmsReceivingSubmission: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(), 
            pms_sample_gridStr = activeTab.down('sampledetailsgrid').getStore(),
            sampleSiteFrm = activeTab.down('samplecollectionsitefrm');
        if (!sampleSiteFrm.isValid()) {
            toastr.warning('Please Enter All the required sample collection site Details!!', 'Warning Response');
            return false;
        }
        if(pms_sample_gridStr){
            if(pms_sample_gridStr.getCount()==0){
                toastr.warning('Please add atleast one sample detail', 'Warning Response');
                return false;
            }
        }else{
            toastr.warning('Please add atleast one sample detail', 'Warning Response');
            return false;
        }
       // this.saveUnstructuredPmsReceivingBaseDetails(btn);
        return true;
    },

    showSurveillanceApplicationMoreDetails: function (btn) {
        var isReadOnly = btn.isReadOnly,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            applicant_id = '',//activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            ref_no = activeTab.down('displayfield[name=reference_no]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
        if (sub_module_id == 37 || sub_module_id === 37) {
            this.showSurveillanceApplicationMoreDetailsUnstructured(application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        } else {
            this.showSurveillanceApplicationMoreDetailsGeneric(application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly);
        }
    },

    showSurveillanceApplicationMoreDetailsGeneric: function (application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            wizardPnl = Ext.widget('pmsappmoredetailswizard'),
            pmsPlanFrm = wizardPnl.down('applicationpmsplandetailsfrm'),
            sampleSiteFrm = wizardPnl.down('samplecollectionsitefrm'),
            samplesGrid = wizardPnl.down('sampledetailswingrid'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
            filters = {
                section_id: section_id
            };
         //  alert(1);
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});

        wizardPnl.setHeight(550);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        //wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
        sampleSiteFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
      //  samplesGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
       /* if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            wizardPnl.down('combo[name=directorate_id]').setReadOnly(true);
            wizardPnl.down('button[name=save_btn]').setVisible(false);
            wizardPnl.down('button[name=link_pms_plan]').setDisabled(true);
          //  wizardPnl.down('button[action=link_pms_plan]').setDisabled(true);
        }
        */
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
      //alert(3);
        Ext.Ajax.request({
            method: 'GET',
            url: 'surveillance/getPmsApplicationMoreDetails',
            params: {
                application_id: application_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    mainResults = resp.mainResults,
                    pmsResults = resp.pmsResults,
                    sampleSiteResults = resp.sampleSiteResults;
                if (success == true || success === true) {
                    
                    if (mainResults) {
                        wizardPnl.down('combo[name=zone_id]').setValue(mainResults.zone_id);
                        wizardPnl.down('combo[name=directorate_id]').setValue(mainResults.directorate_id);
                    }
                    
                    if (pmsResults) {
                        var model = Ext.create('Ext.data.Model', pmsResults);
                        pmsPlanFrm.loadRecord(model);
                    }
                    
                    if (sampleSiteResults) {
                        var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                        sampleSiteFrm.loadRecord(model2);
                    }
                    
                    funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow');
                   // var productsStr = pmsPlanFrm.down('combo[name=product_id]').getStore(),
                     var   regionsStr = pmsPlanFrm.down('combo[name=region_id]').getStore();
                   // productsStr.load({params: {program_id: pmsResults.program_id}});
                    regionsStr.load({params: {program_id: pmsResults.program_id}});
                    
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
        //return
    },

    showSurveillanceApplicationMoreDetailsUnstructured: function (application_id, application_code, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly) {
        Ext.getBody().mask('Please wait...');

        var me = this,
            wizardPnl = Ext.widget('pmsappmoredetailswizardunstructured'),
            sampleSiteFrm = wizardPnl.down('samplecollectionsitefrm'),
            samplesGrid = wizardPnl.down('sampledetailswingrid'),
            dosageStore = Ext.getStore('dosageformstr'),
            unitsStore = Ext.getStore('packagingunitsstr'),
            samplingSitesStore = Ext.getStore('businesstypesstr'),
            dosageFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = samplesGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = samplesGrid.getColumnManager().getHeaderByDataIndex('device_type'),
            commonNameCol = samplesGrid.getColumnManager().getHeaderByDataIndex('common_name'),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        dosageStore.removeAll();
        dosageStore.load({params: {filters: filters}});
        unitsStore.removeAll();
        unitsStore.load({params: {filters: filters}});
        samplingSitesStore.removeAll();
        samplingSitesStore.load({params: {filters: filters}});

        wizardPnl.setHeight(550);
        wizardPnl.down('hiddenfield[name=process_id]').setValue(process_id);
        wizardPnl.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        wizardPnl.down('hiddenfield[name=application_id]').setValue(application_id);
        wizardPnl.down('hiddenfield[name=application_code]').setValue(application_code);
        wizardPnl.down('hiddenfield[name=module_id]').setValue(module_id);
        wizardPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        wizardPnl.down('hiddenfield[name=section_id]').setValue(section_id);
        //wizardPnl.down('combo[name=zone_id]').setReadOnly(true);
        sampleSiteFrm.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        samplesGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
            wizardPnl.down('combo[name=directorate_id]').setReadOnly(true);
            wizardPnl.down('button[name=save_btn]').setVisible(false);
        }
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
            if (commonNameCol) {
                commonNameCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
        Ext.Ajax.request({
            method: 'GET',
            url: 'surveillance/getPmsApplicationMoreDetails',
            params: {
                application_id: application_id
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    mainResults = resp.mainResults,
                    pmsResults = resp.pmsResults,
                    sampleSiteResults = resp.sampleSiteResults;
                if (success == true || success === true) {
                    if (mainResults) {
                        wizardPnl.down('combo[name=zone_id]').setValue(mainResults.zone_id);
                        wizardPnl.down('combo[name=directorate_id]').setValue(mainResults.directorate_id);
                    }
                    if (pmsResults) {
                        /*var model = Ext.create('Ext.data.Model', pmsResults);
                        pmsPlanFrm.loadRecord(model);*/
                    }
                    if (sampleSiteResults) {
                        var model2 = Ext.create('Ext.data.Model', sampleSiteResults);
                        sampleSiteFrm.loadRecord(model2);
                    }
                    funcShowCustomizableWindow(ref_no, '85%', wizardPnl, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showAddSampleIngredientsWin: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            sample_id = win.down('hiddenfield[name=sample_id]').getValue(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            childObject = Ext.widget(childXtype),
            ingredientStr = childObject.down('combo[name=ingredient_id]').getStore(),
            inclusionStr = childObject.down('combo[name=inclusion_reason_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        ingredientStr.removeAll();
        ingredientStr.load({params: {filters: filters}});
        inclusionStr.removeAll();
        inclusionStr.load({params: {section_id: section_id}});
        childObject.down('hiddenfield[name=sample_id]').setValue(sample_id);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    showEditSampleIngredientsWin: function (item, record) {
        var winTitle = item.winTitle,
            winWidth = item.winWidth,
            childObject = Ext.widget(item.childXtype),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            ingredientStr = childObject.down('combo[name=ingredient_id]').getStore(),
            inclusionStr = childObject.down('combo[name=inclusion_reason_id]').getStore(),
            filters = {
                section_id: section_id
            };
        filters = JSON.stringify(filters);
        ingredientStr.removeAll();
        ingredientStr.load({params: {filters: filters}});
        inclusionStr.removeAll();
        inclusionStr.load({params: {section_id: section_id}});
        childObject.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, childObject, 'customizablewindow');
    },

    savePmsTCMeetingDetails: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            toaster = btn.toaster,
            frm = form.getForm(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
        if (frm.isValid()) {
            frm.submit({
                url: 'surveillance/saveTCMeetingDetails',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                params: {
                    application_code: application_code
                },
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message,
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        form.down('hiddenfield[name=id]').setValue(record_id);
                        if (toaster == 1 || toaster === 1) {
                            toastr.success(message, "Success Response");
                        }
                        return true;
                    } else {
                        toastr.error(message, 'Failure Response');
                        closeActiveWindow();
                        return false;
                    }
                },
                failure: function (fm, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                    closeActiveWindow();
                    return false;
                }
            });
        } else {
            toastr.warning('Fill all required fields!!', 'Warning Response');
            closeActiveWindow();
            return false;
        }
    },

    showAddPmsProgram: function (btn) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            grid = btn.up('grid'),
            homePnl = grid.up('panel'),
            addPnl = Ext.widget('pmsprogramcontainer');
          /*  plansGrid = addPnl.down('pmsprogramplansgrid'),
            dosageFormCol = plansGrid.getColumnManager().getHeaderByDataIndex('dosage_form'),
            productFormCol = plansGrid.getColumnManager().getHeaderByDataIndex('product_form'),
            deviceTypeCol = plansGrid.getColumnManager().getHeaderByDataIndex('device_type');
        if (section_id == 1 || section_id == 3 || section_id === 1 || section_id === 3) {//food and cosmetics
            if (productFormCol) {
                productFormCol.setHidden(false);
            }
        } else if (section_id == 4 || section_id === 4) {//medical devices
            if (deviceTypeCol) {
                deviceTypeCol.setHidden(false);
            }
        } else {
            if (dosageFormCol) {
                dosageFormCol.setHidden(false);
            }
        }
       */ 
        grid.hide();
        homePnl.add(addPnl);
    }

});