export const RMC_BASIC = { "A1": "Fiber_Fluff", "A2": "CFK Segment", "A3": "Over Moulding", "Air_connector_stuffy": "Air_connector_stuffy", "Air_hose_remains": "Air_hose_remains", "Airfilter_broken": "Airfilter_broken", "Dust_Dirt": "Dust_Dirt", "Fiber_Microdust": "Fiber_Microdust", "Missing_Screw": "Missing_Screw", "Oil_Flude": "Oil_Flude", "Water_Humid": "Water_Humid", "packing_not_ok": "packing_not_ok", "with_swap_cable": "with_swap_cable" }
export const RMC_BASIC_DATA = [{ "key": "A1", "value": "Fiber_Fluff" }, { "key": "A2", "value": "CFK Segment" }, { "key": "A3", "value": "Over Moulding" }, { "key": "Air_connector_stuffy", "value": "Air_connector_stuffy" }, { "key": "Air_hose_remains", "value": "Air_hose_remains" }, { "key": "Airfilter_broken", "value": "Airfilter_broken" }, { "key": "Dust_Dirt", "value": "Dust_Dirt" }, { "key": "Fiber_Microdust", "value": "Fiber_Microdust" }, { "key": "Missing_Screw", "value": "Missing_Screw" }, { "key": "Oil_Flude", "value": "Oil_Flude" }, { "key": "packing_not_ok", "value": "packing_not_ok" }, { "key": "Water_Humid", "value": "Water_Humid" }, { "key": "with_swap_cable", "value": "with_swap_cable" }]

export const RMP_TECH = {"B1":'Communication',"B2":'H-Bridge',"B3":'Mechanically',"B4":'Software not flashed',"B5":'Short circuit',"B6":'Box Lock',"B7":'Missing Controller Screws',"H1":'Axial Coil Defective',"H2":'Short Circuit to housing',"I1":'Potential balance wire def',"K1":'Box Lock Mechanical'}
export const RMP_TECH_DATA = [{ "key": "B1", "value": "Communication" }, { "key": "B2", "value": "H-Bridge" }, { "key": "B3", "value": "Mechanically" }, { "key": "B4", "value": "Software Not Flashed" }, { "key": "B5", "value": "Short Circuit" }, { "key": "B6", "value": "Box Lock" }, { "key": "B7", "value": "Missing Controller Screws" }, { "key": "H1", "value": "Axial Coil Defective" }, { "key": "H2", "value": "Short circuit to housing" }, { "key": "I1", "value": "Potential balance wire def" }, { "key": "K1", "value": "Box Lock Mechanical" }]

export const RMO_IF = {"L1":'Plexi Cover',"L2":'Threaded Bushing',"L3":'Screw is Blocking','L4':'Over Moulding','L5':'Electrically','L6':'Mechanically'}
export const RMO_IF_DATA = [{'key': 'L1', 'value': 'Plexi Cover'}, {'key': 'L2', 'value': 'Threaded Bushing'}, {'key': 'L3', 'value': 'Screw is Blocking'}, {'key': 'L4', 'value': 'Over Moulding'}, {'key': 'L5', 'value': 'Electrically'}, {'key': 'L6', 'value': 'Mechanically'}]

export const RMO_STATOR = {"F1":'Pin Broken', 'F2':'Mechanically', 'F3':'Electrically', 'F4':'Magnet Displaced', 'F5':'Bearing stiffness not passed'}
export const RMO_STATOR_DATA = [{'key': 'F1', 'value': 'Pin Broken'}, {'key': 'F2', 'value': 'Mechanically'}, {'key': 'F3', 'value': 'Electrically'}, {'key': 'F4', 'value': 'Magnet Displaced'}, {'key': 'F5', 'value': 'Bearing stiffness not passed'}]

export const RMO_IR = {"E1":'Mechanically', 'E2':'Electrically'}
export const RMO_IR_DATA = [{'key': 'E1', 'value': 'Mechanically'}, {'key': 'E2', 'value': 'Electrically'}]

export const RMO_Z = {"J1":'Mechanically',"J2":'Electrically',"J3":'Swing'}
export const RMO_Z_DATA = [{'key': 'J1', 'value': 'Mechanically'}, {'key': 'J2', 'value': 'Electrically'}, {'key': 'J3', 'value': 'Swing'}]

export const RMO_STATOR_OUTSIDE = {"Oil_Flude_RMO": "Oil_Flude", "Water_Humid_RMO": "Water_Humid", "Dust_Dirt_RMO": "Dust_Dirt", "Fiber_Microdust_RMO": "Fiber_Microdust"}
export const RMO_STATOR_OUTSIDE_DATA = [{'key': 'Oil_Flude_RMO', 'value': 'Oil_Flude'}, {'key': 'Water_Humid_RMO', 'value': 'Water_Humid'}, {'key': 'Dust_Dirt_RMO', 'value': 'Dust_Dirt'}, {'key': 'Fiber_Microdust_RMO', 'value': 'Fiber_Microdust'}]


export const RMS_RFM = {"RMS1":'RFM->X1 No Value (Control PCB or Stator Problem)', "RMS2":'RFM->Y1 No Value (Control PCB or Stator Problem)','RMS3':'RFM X2:->Out of range( Back or Z-sensor Problem)', 'RMS4':'RFM Y2:->Out of range( Back or Z-sensor Problem)'}
export const RMS_RFM_DATA = [{'key': 'RMS1', 'value': 'RFM->X1 No Value (Control PCB or Stator Problem)'}, {'key': 'RMS2', 'value': 'RFM->Y1 No Value (Control PCB or Stator Problem)'}, {'key': 'RMS3', 'value': 'RFM X2:->Out of range( Back or Z-sensor Problem)'}, {'key': 'RMS4', 'value': 'RFM Y2:->Out of range( Back or Z-sensor Problem)'}]


export const RMS_B = {"RMS5":'External Startup time > 40000(PCB Problem)', "RMS6":'Internal Startup time > 35000 (Stator Electrical Problem)',"RMS7":'Big Circle value -0.2 OR +0.2 - Good',"RMS8":'Big Circle value -0.5 OR +0.5 - OK', "RMS9":"Big Circle value -1.0 OR +1.0 - Doubtfull/Stator Mec. Problem"}
export const RMS_B_DATA = [{'key': 'RMS5', 'value': 'External Startup time > 40000(PCB Problem)'}, {'key': 'RMS6', 'value': 'Internal Startup time > 35000 (Stator Electrical Problem)'}, {'key': 'RMS7', 'value': 'Big Circle value -0.2 OR +0.2 - Good'}, {'key': 'RMS8', 'value': 'Big Circle value -0.5 OR +0.5 - OK'}, {'key': 'RMS9', 'value': 'Big Circle value -1.0 OR +1.0 - Doubtfull/Stator Mec. Problem'}]

export const RMP_RMS = {"B8":"Thick Pulse","B9":'Radial Not Open',"B10":'Pulse Very',"B11":'Bearing Stiffness',"B12":'Starting Problem',"B13":'RPM Down/Over'}
export const RMP_RMS_DATA = [{"key": "B8", "value": "Thick Pulse"}, {"key": "B9", "value": "Radial Not Open"}, {"key": "B10", "value": "Pulse Very"},{ "key": "B11", "value": "Bearing Stiffness"},{ "key": "B12", "value": "Starting Problem"}, { "key": "B13", "value": "RPM Down/Over"}]